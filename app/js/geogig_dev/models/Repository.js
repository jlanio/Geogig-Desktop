var request = require('request');

class Repository {
    constructor(name, serverAddress) {
        this._name = name;
        this._serverAddress = serverAddress;
    }
    static initServer(){
        return new Promise((resolve, reject) => {
            Utils.geogig(['serve','--multirepo'])
                .then(response  => resolve(response))
                .catch(error => reject(error));
        })   
    }
    init() {
        return Utils.geogig(['init' , this._name])
            .then(response  => {return response})
            .catch(error => {return error});
    }
    importShapefile(shpAdress){
        return Utils.geogig(['shp', 'import', shpAdress],  this._name)
            .then(response  => {return response})
            .catch(error => {return error});
    }
    exportShapefile(layer, localSave){
        return  Utils.geogig(['shp','export', layer.nome, `${localSave}\${layer.nome}.shp`])
            .then(response  => {return response})
            .catch(error => {return error});
    }
    add(){
       return Utils.geogig(['add'],  this._name)
            .then(response  => {return response})
            .catch(error => {return error}); 
    };
    addRemote(){
        return Utils.geogig(['remote', 'add', 'origin', this._serverAddress])
            .then(response  => {return response})
            .catch(error => {return error});
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

/*ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});*/