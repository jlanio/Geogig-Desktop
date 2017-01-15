function repositorio($scope,$location,db,SweetAlert,repo,toaster,$http,alert){
  /*INIT*/
  $scope.mydb = db.open();

  $scope.selectServeRemote = function(selectedFild){
    db.SetItem('serveRemoteAtivo',selectedFild);
    $location.path('/repo/view_remoto');
  };
  $scope.currentServeRemoteId = function(){
    return db.OpenItem('serveRemoteAtivo'); 
  };
  $scope.currentRepoRemoteData = function(){
    return $scope.mydb.infoRepositorios.remoto[$scope.currentServeRemoteId()]; 
  };

  $scope.selectRepoRemote = function(selectedFild){
    db.SetItem('repoRemoteAtivo',selectedFild);
    return $location.path('/repo/remoto_repo');
  };
  $scope.currentRepoRemoteId = function(){
    return db.OpenItem('repoRemoteAtivo'); 
  };

  $scope.selectRepo = function(selectedFild){
    db.SetItem('repoLocalAtivo',selectedFild);
    return $location.path('/repo/view');
  };
  $scope.currentRepoId = function(){
    return db.OpenItem('repoLocalAtivo'); 
  };
  $scope.currentRepoData = function(){
    return $scope.mydb.infoRepositorios.local[$scope.currentRepoId()]; 
  };
  /*INI END*/
  function NewRepoCrl (inputValue){
    if (inputValue === false) return false;
    if (inputValue === "") {
      swal.showInputError("Calma aê, o campo esta vazio!");
      return false
    }else{
      var tmp  = db.open();
      tmp.infoRepositorios.local.push(
      {
        "nome":inputValue,
        "arquivos":[],
        "descricao":"",
        "origin":"local",
        "remote":""
      });
      db.set(tmp);
      $scope.mydb = db.open();
      repo.init(inputValue, function  (code, stdout, stderr){
        swal("Muito bem!", stdout +" criado.", "success");
      });
    }
  }
  function NewCommitCtrl(inputValue){
      if (inputValue === false) return false;

      if (inputValue === "") {
        swal.showInputError("Vai com calma, o campo esta vazio!");
        return false
      }else{     
        repo.commit(db.open().infoRepositorios.local[$scope.currentRepoId()].nome, inputValue,function(data){
          swal("", data +" ", "success"); 
        });
      }
    };
  function NewShpCtrl (inputValue){
      if (inputValue === false) return false;

      if (inputValue === "") {
        swal.showInputError("Vai com calma, o campo esta vazio!");
        return false
      }else{
        var a  = db.open();
        a.infoRepositorios.local[db.OpenItem('repoLocalAtivo')].arquivos.push({'nome':inputValue,'localDir':$scope.localShp});
        db.set(a);
        $scope.mydb = db.open();
        repo.shpImport(a.infoRepositorios.local[db.OpenItem('repoLocalAtivo')].nome,$scope.localShp, function(data){
          swal("Shapefile", inputValue +" importado com sucesso", "success");     
        }); 
      }
    };
  $scope.NewRepo = function(){
    alert.open(
      "Titulo",
      "sub-mensagem",
      "input",
      "inputPlaceholder",
      NewRepoCrl)};

  $scope.NewCommit = function(){
    alert.open(
      "Novo Commit",
      "Blz! Agora adicione um comentario:",
      "input",
      "Entre aqui com seu comentario",
      NewCommitCtrl
    )};

  $scope.NewShp = function(localShp){
    alert.open(
      "Dê um nome",
      "Blz! Agora adicione um comentario:",
      "input",
      "Entre aqui com seu comentario",
      NewShpCtrl)
  };

  $scope.dialog = function(){
    const {dialog} = require('electron').remote;
    dialog.showOpenDialog(
    {
      defaultPath: 'c:/',
      filters: [
      { name: 'All Files', extensions: ['*'] },
      { name: 'Shapefile', extensions: ['shp'] }
      ],
      properties: ['openFile']
    },
    function (fileName) {
      if (fileName === undefined){
        return;
      }else{
        $scope.NewShp(fileName[0]);
        $scope.localShp = fileName[0];
      }
    })
  };

  $scope.add = function (){
    repo.add(db.open().infoRepositorios.local[db.OpenItem('repoLocalAtivo')].nome, function(code, stdout, stderr){
       swal("", stdout +" ");
    });
  };
  $scope.analisar = function(){
    var shapefile = db.open().infoRepositorios.local[db.OpenItem('repoLocalAtivo')].arquivos;
    for (cada in shapefile){
      repo.shpImport(
        db.open().infoRepositorios.local[db.OpenItem('repoLocalAtivo')].nome,
        db.open().infoRepositorios.local[db.OpenItem('repoLocalAtivo')].arquivos[cada].localDir,
        function(code, stdout, stderr){
          console.log("code:"+code, "strdout: "+stdout, "stderr: "+stderr);
          swal("", code +"");
        }
        )
      console.log(db.open().infoRepositorios.local[db.OpenItem('repoLocalAtivo')].arquivos[cada].localDir);
    }
  }
  $scope.addReporemoto = function (remoto) {
    $http.get(remoto.url+"geoserver/geogig/repos.json").success(function(data){
      var a  = db.open();
      a.infoRepositorios.remoto.push(
      {
        "nome":remoto.titulo,
        "url":remoto.url,
        "repos":[]
      });
      db.set(a);
      var b = db.open();
      for (x in data.repos.repo){
        b.infoRepositorios.remoto[b.infoRepositorios.remoto.length - 1].repos.push(
        {
          "nome":data.repos.repo[x].name,
          "id":data.repos.repo[x].id,
          "href":data.repos.repo[x].href
        });
        db.set(b);
      }
    }).error(function(){
      toaster.pop({
        type: 'error',
        title: 'Deu ruim!',
        body: 'Servidor não encontrado ou URL inválida.',
        showCloseButton: true
      });
    });
  }

$scope.clone = function(id, nome, url){
  repo.clone(url, nome ,function(error, stdout, stderr){
    var a = db.open();
    a.infoRepositorios.local.push(
      {
        "nome":nome,
        "arquivos":[],
        "descricao":"",
        "origin":"remote",
        "remote": url.replace(".json","")
      });
      db.set(a);
      $scope.mydb = db.open();
      console.log(error, stdout, stderr);
      swal("", stdout +"");
  })
}
$scope.log = function (){
  repo.log($scope.currentRepoData().remote,function(data){
     $location.path('/repo/historico');
   window.localStorage['commit'] = angular.toJson(data);
  });
}
var Openlog = function(){
  return angular.fromJson(window.localStorage['commit']).response.commit
}
$scope.load = Openlog();

};

angular
.module('gitgeo')
.controller('repositorio', repositorio)