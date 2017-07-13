const request = require('request');

class Repository  {
    constructor( name, id = [], serverAddress = `http://localhost:8182/repos/${name}`, shpfile = [], type = 'local'){
        this._id = id;
        this._name = name;
        this._serverAddress = serverAddress;
        this._shpfile = shpfile;
        this._type = type;
    }
    get id (){return this._id};
    get name (){return this._name};
    get serverAddress (){return this._serverAddress};
    get shpfile (){return this._shpfile};
    get type (){return this._type};

    set id (newId){this._id = newId};
    set name (newName){this._name = newName};
    set serverAddress (newServerAddress){this._serverAddress = newServerAddress};
    set shpfile (newShpfile){this._shpfile = newShpfile};
    set type (newType){this._type = newType};

    static initServer(){
        return new Promise((resolve, reject) => {
            Utils.geogig(['serve','--multirepo'])
                .then(response  => resolve(response))
                .catch(error => reject(error));
        })
    }
    init() {
        return Utils.geogig(['init' , this._name])
            .then(response  => response)
            .catch(error => error);
    }
    importShapefile(shpDir){
        return Utils.geogig(['shp', 'import', shpDir.shpfile], this._name)
            .then(response  => response)
            .catch(error =>  error);
    }
    add(){
       return Utils.geogig(['add'],  this._name)
            .then(response  => response)
            .catch(error => error);
    };
    exportShapefile(newLocal , RepositoryName){
        console.log(RepositoryName , newLocal)
        return  Utils.geogig(['shp','export', RepositoryName, newLocal], this._name)
            .then(response  => response)
            .catch(error => error);
    }
    addRemote(){
        return Utils.geogig(['remote', 'add', 'origin', this._serverAddress])
            .then(response  => {response})
            .catch(error => {error});
    }
    ls(){
        return new Promise((resolve, reject) => {
           request(`${this._serverAddress}/ls-tree.json`, (error, response, body) => {
                resolve(JSON.parse(body).response.node.map(shp => getJson.shpfile(shp.path)));
            })
        })
    }
    log() {
        return new Promise((resolve, reject) => {
            request(`${this._serverAddress}/log.json`,
                (error, response, body)=>{error ? reject(error) : resolve(body)}
            )
        });
    };
    pull(){
        return Utils.geogig(['pull'], this._name)
            .then(response  => response)
            .catch(error => error);
    };
    push(){
        return Utils.geogig(['push'], this._name)
            .then(response  => response)
            .catch(error => error);
    }
    clone(){
        return Utils.geogig(['clone', this._serverAddress, `${this._name}.remote`])
        .then(response  => response)
        .catch(error => error);
    }

}
