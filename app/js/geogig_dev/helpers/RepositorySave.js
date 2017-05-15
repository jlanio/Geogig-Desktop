class SaveRepository extends Repository {
    constructor(name, serverAddress) {
        super(name, serverAddress);
        this._mydb = new Database();       
    }
    saveRemoteConnection(newObj){
        $s.mydb.infoRepositorios.conectedIn.push(newObj)
        this._mydb.open().then((data) => {
            data.infoRepositorios.conectedIn.push(newObj);
            this._mydb.set(data);
        })
    }
    updateRemoteRepositories(id, repositories){
        $s.mydb.infoRepositorios.conectedIn[id].repos = [];
        $s.mydb.infoRepositorios.conectedIn[id].repos = repositories;
        this._mydb.open().then((data) => {
            data.infoRepositorios.conectedIn = $s.mydb.infoRepositorios.conectedIn;
            this._mydb.set(data);
        })
        swal("Update", repositories.length +" Repository successfully imported!", "success")
    }

    saveLocal(newObj){
        $s.mydb.infoRepositorios.local.push(newObj);
        this._mydb.open().then((data) => {
            data.infoRepositorios.local.push(newObj);
            this._mydb.set(data);
        })
    }
    saveshpFile(id, name, localShp){
        $s.mydb.infoRepositorios.local[id].shpfile.push(GeneratorJson.shpfile(name, localShp));
        this._mydb.open().then((data) =>{
            data.infoRepositorios.local[id].shpfile.push(GeneratorJson.shpfile(name, localShp));
            this._mydb.set(data);
        })
    }
}