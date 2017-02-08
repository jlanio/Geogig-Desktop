var cmd = require('child_process').execFile;


function generateBat (command,callback){
  cmd(
    'C:/geogig/bin/geogig.bat', 
    command, 
    (error, stdout, stderr) => {
      callback(error,stdout, stderr)
    })
}

function repo (utils, $http){
  var remoteDir = function(_Name){
    return utils.setRemote(_Name);
  }
  var localDir = function(_Name){
    return utils.setLocal(_Name);
  }


  var _init = function (_Name, ressult) {
    generateBat(['--repo', localDir(_Name),'init'],(error, stdout, stderr)=>{
      ressult(error, stdout, stderr);
    })
  };
  function addRemote (_Name, url_repo){
  generateBat(['--repo', localDir(_Name), 'remote', 'add', 'origin',url_repo],(error, stdout, stderr)=>{
    console.log(error, stdout, stderr);
    console.log('--repo '+_Name+' remote add origin'+ url_repo+ 'adicionado com sucesso!');
  })
  }
  var _initRemote = function (_Name, ressult) {
    const toServer = "http://35.184.15.202:8080/geoserver/geogig/repos/"+_Name+"/init.json";
    const config = {headers: {'content-type':'application/json'}};
    $http.put(toServer,{},config).success(function(data){
      const url1 = data.response.repo.href;
      const url2 = url1.replace(".json","");
      ressult(data,url2)
      addRemote(_Name,url2)
    }).error(function(data){
      ressult(data)
    })
  };
  var _shpImport = function (_Name, localShp, ressult) {
    generateBat(['--repo', localDir(_Name), 'shp', 'import', localShp], function(error, stdout, stderr){
      ressult(stdout);
    });
  };
  var _shpImportRemote = function (_Name, localShp, ressult) {
    console.log(remoteDir(_Name));
    generateBat(['--repo', remoteDir(_Name), 'shp', 'import', localShp], function(error, stdout, stderr){
      ressult(stdout);
    });
  };
  var _add = function (_Name, ressult) {
      generateBat(['--repo', localDir(_Name), 'add'], function(error, stdout, stderr){
            ressult(error, stdout, stderr)
          });
  };
   var _addRemoto = function (_Name, ressult) {
      console.log(remoteDir(_Name));
      generateBat(['--repo', remoteDir(_Name), 'add'], function(error, stdout, stderr){
            ressult(error, stdout, stderr)
          });
  };
  var _commitRemoto = function (_Name, commit, ressult) {
      return generateBat(['--repo', remoteDir(_Name), 'commit', '-m', commit],function(error, stdout, stderr){
        ressult(stdout);
      });
  };
  var _cmdCommit = function (_Name, commit, ressult) {
      return generateBat(['--repo', localDir(_Name), 'commit', '-m', commit],function(error, stdout, stderr){
        ressult(stdout);
      });
  };
  var _clone = function (url, _Name, ressult) {
      url2 = url.replace(".json","");
      return generateBat(['clone', url2, 'app/tmp/remote/'+_Name], function(error, stdout, stderr){
        ressult(error, stdout, stderr)
          });
  };
  var _log = function (url, ressult) {
     $http.get(url+"/log.json").success(function(data){
        ressult(data);
     })
  };
  var _pull = function(_Name, ressult){
    generateBat(['--repo',remoteDir(_Name), 'pull'],(error, stdout, stderr)=>{
      ressult(error, stdout, stderr);
    })
  }
   var _push = function(_Name, ressult){
    generateBat(['--repo',remoteDir(_Name), 'push'],(error, stdout, stderr)=>{
      ressult(error, stdout, stderr);
    })
  }
  var _ls_tree = function (_Name,ressult){
    $http.get("http://35.184.15.202:8080/geoserver/geogig/repos/"+_Name+"/ls-tree.json").success(function(data){
      ressult(data);
    }).error(function(data){
      ressult(data);
    })
  }
  var _shp_export = function (_Name, camada,localSave, ressult){
    generateBat(['--repo',remoteDir(_Name),'shp','export',camada.nome,localSave+'\\'+camada.nome+'.shp'],(error, stdout, stderr)=>{
      ressult(error, stdout, stderr);
    })
  }


  return {
    init: _init,
    initRemote : _initRemote,
    shpImport: _shpImport,
    shpImportRemote : _shpImportRemote,
    add : _add,
    addRemoto : _addRemoto,
    clone : _clone,
    commit : _cmdCommit,
    commitRemoto :_commitRemoto,
    log: _log,
    pull : _pull,
    push : _push,
    ls : _ls_tree,
    shp_export : _shp_export
  };

};
angular
.module("gitgeo")
.factory("repo", repo)