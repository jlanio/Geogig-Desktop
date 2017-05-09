var request = require('request');

class Repository {
    constructor(name, origin, serverAddress) {
        this._name = name;
        this._origin = origin;
        this._serverAddress = serverAddress;
    }
    static initServer(){
        Utils.geogig(['serve','--multirepo'])
            .then(response  => console.log(response))
            .catch(error => console.log(error));   
    }
    init() {
        Utils.geogig(['init' , this._name])
            .then(response  => console.log(response))
            .catch(error => console.log(error));    
    }
    importShapefile(shpAdress){
        Utils.geogig(['shp', 'import', shpAdress])
            .then(response  => console.log(response))
            .catch(error => console.log(error));   
    }
    exportShapefile(layer, localSave){
        Utils.geogig(['shp','export', layer.nome, `${localSave}\${layer.nome}.shp`])
            .then(response  => console.log(response))
            .catch(error => console.log(error)); 
    }
    add(){
        Utils.geogig(['add'])
            .then(response  => console.log(response))
            .catch(error => console.log(error)); 
    };
    addRemote(){
        Utils.geogig(['remote', 'add', 'origin', this._serverAddress])
            .then(response  => console.log(response))
            .catch(error => console.log(error)); 
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
        Utils.geogig(['pull'])            
            .then(response  => console.log(response))
            .catch(error => console.log(error)); 
    };
    push(){
        Utils.geogig(['push'])
            .then(response  => console.log(response))
            .catch(error => console.log(error)); 
    }
    /*clone(callback){
        return new Promise((resolve, reject) => {
            Utils.geogig(['clone', this._serverAddress, this._name],{cwd: Utils.pwd('remote','')},
                (error, stdout, stderr)=>{error ? reject(error) : resolve(stdout)}
            )     
        });
    }
*/
}

Repository.initServer
/*ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});*/