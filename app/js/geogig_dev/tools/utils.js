var path = require("path");
var cmd = require('child_process').execFile;
var rep_local = path.dirname(require.main.filename);

function utils(){
	var _pwd = function (Nome, tipo) {
		if (tipo === 'local'){
			return rep_local.slice(2).replace(/\\/g,'/')+'/tmp/local/'+Nome;
		}else if (tipo === 'remoto'){
			return rep_local.slice(2).replace(/\\/g,'/')+'/tmp/remote/'+Nome;
		}else{
			console.log('Seu repositorio nao e remoto nem local');
			return 'error'
		}
	}
	var _generateBat = function (command,callback){
	  cmd(
	    'C:/geogig/bin/geogig.bat', 
	    command, 
	    (error, stdout, stderr) => {
	      callback(error,stdout, stderr)
	    })
	}
	return {
		pwd: _pwd,
		geogig: _generateBat

	};
};

angular
.module("gitgeo")
.factory("utils", utils)

