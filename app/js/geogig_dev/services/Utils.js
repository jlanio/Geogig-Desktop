var path = require("path").dirname(require.main.filename);
var spawn = require('child_process').spawn;

class Utils {

	static pwd(type, name) {
		return name ? `${path}/tmp/${type}/${name}` : `${path}/tmp/${type}`;
	}
	
	static geogig (args){
		return new Promise((resolve, reject) => {
			let processObject = spawn(`${path}/geogig/bin/geogig.bat`, 
				args, 
				{cwd: this.pwd('local')}
			);
			processObject.stdout.setEncoding('utf8');
			processObject.stdout.on('data', data => resolve(data));
			processObject.stderr.on('data', data => reject(data));           
		})
	}
}
