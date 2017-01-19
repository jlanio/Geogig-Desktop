var path = require("path");
var rep_local = path.dirname(require.main.filename);

function utils(){

	var _setLocal = function (Nome) {
    	var local = rep_local.slice(2).replace(/\\/g,'/')+'/tmp/local/'+Nome;
    	return local;
    }
    var _setRemote = function (Nome) {
    	var remote = rep_local.slice(2).replace(/\\/g,'/')+'/tmp/remote/'+Nome;
    	return remote;
	}

	return {
		setLocal: _setLocal,
		setRemote: _setRemote 
	};
};

angular
.module("gitgeo")
.factory("utils", utils)

