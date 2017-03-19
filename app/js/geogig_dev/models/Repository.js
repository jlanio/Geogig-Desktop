var request = require('request');
class Repository {
    constructor(name, origin, serverAddress) {
        this.name = name;
        this.origin = origin;
        this.serverAddress = serverAddress;
    }
    static initServer(){
        Utils.geogig(['serve','--multirepo'], {cwd: Utils.pwd('local', ''), detached: true},
            (error, stdout, stderr)=>console.log(error, stdout, stderr)
        );
    }

    init(callback) {
        Utils.geogig(['--repo',  Utils.pwd(this.origin, this.name),'init'],
            (error, stdout, stderr)=>callback(error, stdout, stderr)
        )
    }
    importShapefile(shpAdress, callback){
        Utils.geogig(['--repo',  Utils.pwd(this.origin, this.name), 'shp', 'import', shpAdress],
            (error, stdout, stderr)=>callback(stdout)
        );
    }
    exportShapefile(camada, localSave, callback){
        Utils.geogig(['--repo', Utils.pwd(this.origin, this.name),'shp','export', camada.nome, `${localSave}\${camada.nome}.shp`],
            (error, stdout, stderr)=>callback(error, stdout, stderr))
    }
    add(callback){
        Utils.geogig(['--repo', Utils.pwd(this.origin, this.name), 'add'],
            (error, stdout, stderr)=>{callback(stdout)}
        );
    };
    addRemote(){
        Utils.geogig(['--repo', Utils.pwd(this.origin, this.name), 'remote', 'add', 'origin', this.serverAddress],
            (error, stdout, stderr)=>console.log(error, stdout, stderr)
        )
    }
    ls(callback){
        request(`${this.serverAddress}/ls-tree.json`, 
            (error, response, body)=>callback(JSON.parse(body))
        );
    };
    log(callback) {
        request(`${this.serverAddress}/log.json`, 
            (error, response, body)=>callback(body)
        );
    };
    pull(callback){
        Utils.geogig(['--repo', Utils.pwd(this.origin, this.name), 'pull'],
            (error, stdout, stderr)=>callback(error, stdout, stderr)
        )
    };
    push(callback){
        Utils.geogig(['--repo', Utils.pwd(this.name, this.origin) , 'push'],
            (error, stdout, stderr)=>callback(error, stdout, stderr)
        )
    }
    clone(callback){
        Utils.geogig(['clone', this.serverAddress, this.name],{cwd: Utils.pwd('remote','')},
            (error, stdout, stderr)=>callback(error, stdout, stderr)
        );
    }

}