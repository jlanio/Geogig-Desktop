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

    init() {
        return new Promise((resolve, reject) => {
            Utils.geogig(['--repo',  Utils.pwd(this._origin, this._name),'init'],
                (error, stdout, stderr)=>{error ? reject(error) : resolve(stdout)}
            )  
        });
    }
    importShapefile(shpAdress){
        return new Promise((resolve, reject) => {
            Utils.geogig(['--repo',  Utils.pwd(this._origin, this._name), 'shp', 'import', shpAdress],
                (error, stdout, stderr)=>{error ? reject(error) : resolve(stdout)}
            )      
        });
    }
    exportShapefile(camada, localSave){
        return new Promise((resolve, reject) => {
            Utils.geogig(['--repo', Utils.pwd(this._origin, this._name),'shp','export', camada.nome, `${localSave}\${camada.nome}.shp`],
                (error, stdout, stderr)=>{error ? reject(error) : resolve(stdout)}
            )           
        });
    }
    add(){
        return new Promise((resolve, reject) => {
            Utils.geogig(['--repo', Utils.pwd(this._origin, this._name), 'add'],
                (error, stdout, stderr)=>{error ? reject(error) : resolve(stdout)}
            )            
        });
    };
    addRemote(){
        return new Promise((resolve, reject) => {
            Utils.geogig(['--repo', Utils.pwd(this._origin, this._name), 'remote', 'add', 'origin', this._serverAddress],
                (error, stdout, stderr)=>{error ? reject(error) : resolve(stdout)}
            )   
        });
    }
    ls(){
        return new Promise((resolve, reject) => {
            request(`${this._serverAddress}/ls-tree.json`, 
                (error, response, body)=>{error ? reject(error) : resolve(JSON.parse(body))}
            )
        });
    };
    log() {
        return new Promise((resolve, reject) => {
            request(`${this._serverAddress}/log.json`, 
                (error, response, body)=>{error ? reject(error) : resolve(body)}
            )  
        });
    };
    pull(){
        return new Promise((resolve, reject) => {
            Utils.geogig(['--repo', Utils.pwd(this._origin, this._name), 'pull'],
                (error, stdout, stderr)=>{error ? reject(error) : resolve(stdout)}
            )            
        });
    };
    push(){
        return new Promise((resolve, reject) => {
            Utils.geogig(['--repo', Utils.pwd(this._name, this._origin) , 'push'],
                (error, stdout, stderr)=>{error ? reject(error) : resolve(stdout)}
            )   
        });
    }
    clone(callback){
        return new Promise((resolve, reject) => {
            Utils.geogig(['clone', this._serverAddress, this._name],{cwd: Utils.pwd('remote','')},
                (error, stdout, stderr)=>{error ? reject(error) : resolve(stdout)}
            )     
        });
    }

}