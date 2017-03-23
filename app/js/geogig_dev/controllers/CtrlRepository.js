class CtrlRepository extends Repository {
    constructor(name, origin, serverAddress) {
        super(name, origin, serverAddress);
        this.mydb = new Database();
        
    }
    saveConexao(newObj){
        this.mydb.open().then((data) => {
            data.infoRepositorios.conectedIn.push(newObj);
            this.mydb.set(data);
        })
    }
    saveLocal(newObj){
        this.mydb.open().then((data) => {
            data.infoRepositorios.local.push(newObj);
            this.mydb.set(data);
        })
    }
    saveshpFile(id, newObj){
        this.mydb.open().then((data) =>{
            data.infoRepositorios.local[id].shpfile.push(newObj);
            this.mydb.set(data);
        })
    }
}