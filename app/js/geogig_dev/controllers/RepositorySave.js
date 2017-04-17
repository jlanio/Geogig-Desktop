class SaveRepository extends Repository {
    constructor(name, origin, serverAddress) {
        super(name, origin, serverAddress);
        this._mydb = new Database();       
    }
    saveConexao(newObj){
        this._mydb.open().then((data) => {
            data.infoRepositorios.conectedIn.push(newObj);
            this._mydb.set(data);
        })
    }
    saveLocal(newObj){
        this._mydb.open().then((data) => {
            data.infoRepositorios.local.push(newObj);
            this._mydb.set(data);
        })
    }
    saveshpFile(id, name, localShp){
        this._mydb.open().then((data) =>{
            data.infoRepositorios.local[id].shpfile.push(GeneratorJson.shpfile(name, localShp));
            this._mydb.set(data);
        })
    }
}