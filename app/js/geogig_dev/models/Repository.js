var request = require('request');

class Repository {
    constructor(name, origin, serverAddress) {
        this._name = name;
        this._origin = origin;
        this._serverAddress = serverAddress;
    }
    static initServer(){
        let child = Utils.geogig(['serve','--multirepo'], {cwd: Utils.pwd('local'),detached: true}, function (error, stdout, stderr) {
            console.log(error, stdout, stderr);
        });
    return child.pid;
    }

    init(callback) {
        Utils.geogig(['--repo',  Utils.pwd(this._origin, this._name),'init'],
            (error, stdout, stderr)=>callback(stdout)
        )
    }
    importShapefile(shpAdress, callback){
        Utils.geogig(['--repo',  Utils.pwd(this._origin, this._name), 'shp', 'import', shpAdress],
            (error, stdout, stderr)=>callback(stdout)
        );
    }
    exportShapefile(camada, localSave, callback){
        Utils.geogig(['--repo', Utils.pwd(this._origin, this._name),'shp','export', camada.nome, `${localSave}\${camada.nome}.shp`],
            (error, stdout, stderr)=>callback(error, stdout, stderr))
    }
    add(callback){
        Utils.geogig(['--repo', Utils.pwd(this._origin, this._name), 'add'],
            (error, stdout, stderr)=>{callback(stdout)}
        );
    };
    addRemote(){
        Utils.geogig(['--repo', Utils.pwd(this._origin, this._name), 'remote', 'add', 'origin', this._serverAddress],
            (error, stdout, stderr)=>console.log(error, stdout, stderr)
        )
    }
    ls(callback){
        request(`${this._serverAddress}/ls-tree.json`, 
            (error, response, body)=>callback(JSON.parse(body))
        );
    };
    log(callback) {
        request(`${this._serverAddress}/log.json`, 
            (error, response, body)=>callback(body)
        );
    };
    pull(callback){
        Utils.geogig(['--repo', Utils.pwd(this._origin, this._name), 'pull'],
            (error, stdout, stderr)=>callback(error, stdout, stderr)
        )
    };
    push(callback){
        Utils.geogig(['--repo', Utils.pwd(this._name, this._origin) , 'push'],
            (error, stdout, stderr)=>callback(error, stdout, stderr)
        )
    }
    clone(callback){
        Utils.geogig(['clone', this._serverAddress, this._name],{cwd: Utils.pwd('remote','')},
            (error, stdout, stderr)=>callback(error, stdout, stderr)
        );
    }

}