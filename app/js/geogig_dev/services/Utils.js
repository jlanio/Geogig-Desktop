const path = require("path").dirname(require.main.filename);
const spawn = require('child_process').spawn;
const exec = require("child_process").exec

class Utils {

	static pwd(name) {
		return `${path}\\tmp\\${name}`;
	}
	
	static geogig (args, name=''){
		let {stderrData, stdoutData} = '';
		let child = spawn(`${path}\\geogig\\bin\\geogig.bat`, args, {cwd: this.pwd(name), detached: false});
		child.stdout.setEncoding('utf8');
		child.stdout.on('data', data => {stdoutData += data});
		child.stderr.on('data', data => {stderrData += data});
		
		return new Promise((resolve, reject) => {
			child.on('close', code => stderrData ? reject(stderrData) : resolve(stdoutData));
	        child.on('error', err => reject(err));
        });
	}
	static killServer (){
		exec("taskkill /f /im java.exe", (error, stdout, stderr) => console.log(stdout));
	}
}
