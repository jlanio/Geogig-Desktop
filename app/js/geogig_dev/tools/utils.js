var path = require("path");
var cmd = require('child_process').execFile;
var rep_local = path.dirname(require.main.filename);

var utils = (function (){
	var _pwd = function (Nome, tipo) {
		if (typeof Nome === 'undefined'){
			if (tipo === 'local'){
				return rep_local.slice(2).replace(/\\/g,'/')+'/tmp/local/'
			}else if(tipo === 'remoto'){
				return rep_local.slice(2).replace(/\\/g,'/')+'/tmp/remote/'
			}
		}else if (typeof Nome === 'null'){
			return rep_local.slice(2).replace(/\\/g,'/')+'/tmp/remote/'
		}else{
			if (tipo === 'local'){
				return rep_local.slice(2).replace(/\\/g,'/')+'/tmp/local/'+Nome;
			}else if (tipo === 'remoto'){
				return rep_local.slice(2).replace(/\\/g,'/')+'/tmp/remote/'+Nome;
			}else{
				console.error('Seu repositorio nao e remoto/local');
				return 'error'
			}
		}
	}
	var _generateBat = function (command,options,callback){
	  return cmd(
	  	rep_local.replace(/\\/g,'/')+'/geogig/bin/geogig.bat',
	    command,
	    options,
	    (error, stdout, stderr) => {
	      callback(error,stdout, stderr)
	    })
	}
	return {
		pwd: _pwd,
		geogig: _generateBat

	};
})()