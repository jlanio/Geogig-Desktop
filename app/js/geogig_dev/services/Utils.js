var path = require("path").dirname(require.main.filename);
var spawn = require('child_process').spawn;

class Utils {

	static pwd(name) {
		return `${path}\\tmp\\${name}`;
	}
	
	static geogig (args, name=''){
		let stdoutData = '';
        let stderrData = '';
		let child = spawn(`${path}\\geogig\\bin\\geogig.bat`, args,{cwd: this.pwd(name)});
		child.stdout.setEncoding('utf8');
		child.stdout.on('data', data => {stdoutData += data});
		child.stderr.on('data', data => {stderrData += data});
		
		return new Promise((resolve, reject) => {
			child.on('close', code => stderrData ? reject(stderrData) : resolve(stdoutData));
	        child.on('error', err => reject(err));
        });
	}
}
