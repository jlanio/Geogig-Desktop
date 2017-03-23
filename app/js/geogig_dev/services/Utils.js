var path = require("path").dirname(require.main.filename).slice(2).replace(/\\/g,'/');
var cmd = require('child_process').execFile;

class Utils {

	static pwd(type, name) {
		return type ? `${path}/tmp/${type}/${name}` : false;
	}
	
	static geogig (command, options, callback){
		return cmd(`${path}/geogig/bin/geogig.bat`, command , options,
				(error, stdout, stderr) => callback(error,stdout, stderr));
	}
}
