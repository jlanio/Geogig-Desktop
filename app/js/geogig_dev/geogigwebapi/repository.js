var cmd = require('child_process').execFile;

function generateBat (command,callback){
  var child = cmd(
    'C:/geogig/bin/geogig.bat', 
    command, 
    (error, stdout, stderr) => {
      callback(error,stdout, stderr)
    })
}
/*generateBat(['--repo', '/Users/jlanio/Desktop/electron-quick-start-master/app/tmp/local/mkoasdasot', 'init'], function(error, stdout, stderr){
  console.log(error, stdout, stderr)
});*/

function repo (utils, $http){
  var repositoryDir = function(){
    return utils.setLocaldir();
  }
  var setLocalRepository = function(_Name){
    return utils.setLocalFile(_Name);
  }

  var _init = function (_Name, ressult) {
    generateBat(['--repo', setLocalRepository(_Name),'init'],(error, stdout, stderr)=>{
      ressult(error, stdout, stderr);
    })
  };
    var _shpImport = function (_Name, localShp, ressult) {
      generateBat(['--repo', setLocalRepository(_Name), 'shp', 'import', localShp], function(error, stdout, stderr){
        ressult(stdout);
      });
  };
  var _add = function (_Name, ressult) {
      generateBat(['--repo', setLocalRepository(_Name), 'add'], function(error, stdout, stderr){
            ressult(error, stdout, stderr)
          });
  };
  var _cmdCommit = function (_Name, commit, ressult) {
    console.log(setLocalRepository(_Name), commit);
      return generateBat(['--repo', setLocalRepository(_Name), 'commit', '-m', commit],function(error, stdout, stderr){
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
    generateBat(['--repo',repositoryDir()+_Name, 'pull'],(error, stdout, stderr)=>{
      console.log(repositoryDir()+_Name);
      ressult(error, stdout, stderr);
    })
  }
   var _push = function(_Name, ressult){
    console.log(repositoryDir()+_Name);
    generateBat(['--repo',repositoryDir()+_Name, 'push'],(error, stdout, stderr)=>{
      console.log(repositoryDir()+_Name);
      ressult(error, stdout, stderr);
    })
  }
  var _ls_tree = function (_Name,ressult){
    $http.get("http://localhost:8080/geoserver/geogig/repos/"+_Name+"/ls-tree.json").success(function(data){
      ressult(data);
    }).error(function(data){
      ressult(data);
    })
  }
  var _shp_export = function (_Name, camada,localSave, ressult){
    generateBat(['--repo',repositoryDir()+_Name,'shp','export',camada.nome,localSave+'\\'+camada.nome+'.shp'],(error, stdout, stderr)=>{
      ressult(error, stdout, stderr);
    })
  }


  return {
    init: _init,
    shpImport: _shpImport,
    add : _add,
    clone : _clone,
    commit : _cmdCommit,
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

















/*var cmd=require('node-cmd');
var request = require("request");

function repo (_Name) {
	var name = _Name;
	var setLocalDir = utils.setLocaldir(); //Retorna o caminho da pasta raiz que contem os repositorios.
	var setLocalRepository = utils.setLocalFile(_Name); // Retorna o caminho da pasta raiz com o nome do Repositorio.
	var localServe = 'http://localhost:8182/repos/'+ _Name;


	this.init = function () {
    	cmd.get('geogig --repo '+setLocalRepository+' init',function(data){
    		console.log(data)
    	});
	};
  this.shpImport = function () {
      cmd.get('geogig --repo '+setLocalRepository+' shp import ' +
        'C:\\Users\\jlanio\\Desktop\\forIMC\\ACRE\\ACRE_PERIMETRO.shp',function(data){
        console.log(data)
      });
  };
  this.add = function () {
      cmd.get('geogig --repo '+setLocalRepository+' add ',function(data){
        console.log(data)
      });
  };
  this.cmdCommit = function () {
      cmd.get('geogig --repo '+setLocalRepository+' commit -m  '+' asdasdasd',function(data){
        console.log(data)
      });
  };


	this.remoteAddOrigin = function (_remoteRepo) {
		request(localServe+'/remote.json?remoteName=origin&remoteURL='+_remoteRepo, 
			function(error, response, body) {
  			console.log(JSON.parse(body));
		});
    };
    this.listBranch = function () {
		request(localServe+'/branch.json?list=true&remote=true', 
			function(error, response, body) {
  			console.log(JSON.parse(body));
		});
    };

    this.pull = function(){
    	request(localServe+'pull?remoteName=origin&all=true&ref=master:master', 
			function(error, response, body) {
  			console.log(JSON.parse(body));
		});
    };

    this.push = function(){
    	request(localServe+'push?ref=master:master&remoteName=origin', 
			function(error, response, body) {
  			console.log(JSON.parse(body));
		});
    };
    this.status = function(){
    	request(localServe+'/status.json', 
			function(error, response, body) {
  			console.log(JSON.parse(body));
		});
    };

}
*/