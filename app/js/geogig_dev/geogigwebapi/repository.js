function repo (utils, $http){

  function addRemote (_Name, type, url_repo){
  utils.geogig(['--repo', utils.pwd(_Name, type), 'remote', 'add', 'origin',url_repo],(error, stdout, stderr)=>{
    console.log(error, stdout, stderr);
  })
  }
  var _init = function (_Name, type, ressult) {
    utils.geogig(['--repo', utils.pwd(_Name, type),'init'],(error, stdout, stderr)=>{
      ressult(error, stdout, stderr);
    })
  };
  var _initRemote = function (_Name, ressult) {
    const toServer = "http://35.184.15.202:8080/geoserver/geogig/repos/"+_Name+"/init.json";
    const config = {headers: {'content-type':'application/json'}};
    $http.put(toServer,{},config).success(function(data){
      const url1 = data.response.repo.href;
      const url2 = url1.replace(".json","");
      console.log(data,"URL: "+url2);
      ressult(data, url2);
      addRemote(_Name, 'local',url2)
    }).error(function(data){
      ressult(data)
    })
  };
  var _shpImport = function (_Name, type, localShp, ressult) {
    utils.geogig(['--repo', utils.pwd(_Name, type), 'shp', 'import', localShp], function(error, stdout, stderr){
      ressult(stdout);
    });
  };
  /*var _shpImportRemote = function (_Name, localShp, ressult) {
    console.log(utils.pwd(local));
    geogig(['--repo', utils.pwd(local), 'shp', 'import', localShp], function(error, stdout, stderr){
      ressult(stdout);
    });
  };*/
  var _add = function (_Name, type, ressult) {
      utils.geogig(['--repo', utils.pwd(_Name, type), 'add'], function(error, stdout, stderr){
            ressult(error, stdout, stderr)
          });
  };
/*   var _addRemoto = function (_Name, type, ressult) {
      console.log(utils.pwd(_Name, type));
      geogig(['--repo', utils.pwd(_Name, type), 'add'], function(error, stdout, stderr){
            ressult(error, stdout, stderr)
          });
  };*/

/*  var _commitRemoto = function (_Name, commit, ressult) {
      return geogig(['--repo', utils.pwd(local), 'commit', '-m', commit],function(error, stdout, stderr){
        ressult(stdout);
      });
  };*/
  var _commit = function (_Name, type, commit, ressult) {
      utils.geogig(['--repo', utils.pwd(_Name, type), 'commit', '-m', commit],function(error, stdout, stderr){
        ressult(stdout);
      });
  };
  var _clone = function (url, _Name, type, ressult) {
      url2 = url.replace(".json","");
      utils.geogig(['clone', url2, 'app/tmp/remote/'+_Name], function(error, stdout, stderr){
        ressult(error, stdout, stderr)
      });
  };
  var _log = function (url, ressult) {
     $http.get(url+"/log.json").success(function(data){
        ressult(data);
     })
  };
  var _pull = function(_Name, type, ressult){
    utils.geogig(['--repo',utils.pwd(_Name, type), 'pull'],(error, stdout, stderr)=>{
      ressult(error, stdout, stderr);
    })
  }
   var _push = function(_Name, type, ressult){
    utils.geogig(['--repo',utils.pwd(_Name, type), 'push'],(error, stdout, stderr)=>{
      ressult(error, stdout, stderr);
    })
  }
  var _ls_tree = function (_Name, type,ressult){
    $http.get("http://35.184.15.202:8080/geoserver/geogig/repos/"+_Name+"/ls-tree.json").success(function(data){
      ressult(data);
    }).error(function(data){
      ressult(data);
    })
  }
  var _shp_export = function (_Name, type, camada,localSave, ressult){
    utils.geogig(['--repo',utils.pwd(_Name, type),'shp','export',camada.nome,localSave+'\\'+camada.nome+'.shp'],(error, stdout, stderr)=>{
      ressult(error, stdout, stderr);
    })
  }


  return {
    init: _init,
    initRemote : _initRemote,
    shpImport: _shpImport,
    add : _add,
    clone : _clone,
    commit : _commit,
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