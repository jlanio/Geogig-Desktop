var request = require('request');

class Repository {
    constructor(name, origin, serverAdress) {
        this.name = name;
        this.origin = origin;
        this.serverAdress = serverAdress;
        this.dir = utils.pwd(this.name, this.origin);
    }
    static initServer(){
        utils.geogig(['serve','--multirepo'], {cwd: utils.pwd(undefined, 'local'), detached: true}, function (error, stdout, stderr) {
            console.log(error, stdout, stderr);
        });
    }

    init(callback) {
        utils.geogig(['--repo',  this.dir,'init'],
            (error, stdout, stderr)=>{
                callback(error, stdout, stderr);
            }
        )
    }
    importShapefile(shpAdress, callback){
        utils.geogig(['--repo',  this.dir, 'shp', 'import', shpAdress],
            (error, stdout, stderr)=>{
                callback(stdout);
            }
        );
    }
    exportShapefile(camada, localSave, callback){
        utils.geogig(['--repo', this.dir,'shp','export', camada.nome, localSave+'\\'+camada.nome+'.shp'],
            (error, stdout, stderr)=>{
                callback(error, stdout, stderr);
            })
    }
    add(callback){
        utils.geogig(['--repo', this.dir, 'add'],
            (error, stdout, stderr)=>{
                callback(stdout);
            }
        );
    };
    addRemote(){
        utils.geogig(['--repo', this.dir, 'remote', 'add', 'origin', this.serverAdress],
            (error, stdout, stderr)=>{
                console.log(error, stdout, stderr);
            }
        )
    }
    ls(callback){
        request.get(this.serverAdress+"/ls-tree.json").success(function(data){
            callback(data);
        }).error(function(data){
            callback(data);
        })
    };
    log(callback) {
        request.get(this.serverAdress+"/log.json").success(function(data){
            callback(data);
        })
    };
    pull(callback){
        utils.geogig(['--repo', this.dir, 'pull'],(error, stdout, stderr)=>{
            callback(error, stdout, stderr);
        })
    };
    push(callback){
        utils.geogig(['--repo', this.dir , 'push'],(error, stdout, stderr)=>{
            callback(error, stdout, stderr);
        })
    }

}