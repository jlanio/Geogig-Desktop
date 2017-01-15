var path = require("path");
var rep_local = path.dirname(require.main.filename);

function utils(){

	var _setLocalFile = function (Nome) {
    	var filename = rep_local.slice(2).replace(/\\/g,'/')+'/tmp/local/'+Nome;
    	return filename;
    }
    var _setLocaldir = function () {
    	var dirname = rep_local.slice(2).replace(/\\/g,'/')+'/tmp/local/';
    	return dirname;
	}

	return {
		setLocalFile: _setLocalFile,
		setLocaldir: _setLocaldir
	};
};

angular
.module("gitgeo")
.factory("utils", utils)

