var request = require('request');

class Repository {
    constructor(name, origin, serverAddress) {
        this.name = name;
        this.origin = origin;
        this.serverAddress = serverAddress;
    }
    static initServer(){
        utils.geogig(['serve','--multirepo'], {cwd: utils.pwd(undefined, 'local'), detached: true}, function (error, stdout, stderr) {
            console.log(error, stdout, stderr);
        });
    }

    init(callback) {
        utils.geogig(['--repo',  utils.pwd(this.name, this.origin),'init'],
            (error, stdout, stderr)=>{
                callback(error, stdout, stderr);
            }
        )
    }
    importShapefile(shpAdress, callback){
        utils.geogig(['--repo',  utils.pwd(this.name, this.origin), 'shp', 'import', shpAdress],
            (error, stdout, stderr)=>{
                callback(stdout);
            }
        );
    }
    exportShapefile(camada, localSave, callback){
        utils.geogig(['--repo', utils.pwd(this.name, this.origin),'shp','export', camada.nome, localSave+'\\'+camada.nome+'.shp'],
            (error, stdout, stderr)=>{
                callback(error, stdout, stderr);
            })
    }
    add(callback){
        utils.geogig(['--repo', utils.pwd(this.name, this.origin), 'add'],
            (error, stdout, stderr)=>{
                callback(stdout);
            }
        );
    };
    addRemote(){
        utils.geogig(['--repo', utils.pwd(this.name, this.origin), 'remote', 'add', 'origin', this.serverAddress],
            (error, stdout, stderr)=>{
                console.log(error, stdout, stderr);
            }
        )
    }
    ls(callback){
        request(this.serverAddress+'/ls-tree.json', (error, response, body)=> {
            callback(JSON.parse(body));
        });
    };
    log(callback) {
        request(this.serverAddress+'/log.json', (error, response, body)=> {
            callback(body);
        });
    };
    pull(callback){
        utils.geogig(['--repo', utils.pwd(this.name, this.origin), 'pull'],(error, stdout, stderr)=>{
            callback(error, stdout, stderr);
        })
    };
    push(callback){
        utils.geogig(['--repo', utils.pwd(this.name, this.origin) , 'push'],(error, stdout, stderr)=>{
            callback(error, stdout, stderr);
        })
    }
    clone(callback){
        utils.geogig(['clone', this.serverAddress, this.name],{cwd: utils.pwd(undefined, 'remoto')}, function(error, stdout, stderr){
        callback(error, stdout, stderr)
      });
    }

}