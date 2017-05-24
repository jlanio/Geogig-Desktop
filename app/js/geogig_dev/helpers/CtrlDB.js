const storage = new PouchDB('db');

class CtrlDB {

    static saveLocal(){
        return storage.get('geogig').then((data) => {
            data.infoRepositorios.local.push(getJson.local.call(this));
            storage.put(data);
            return data
        }).catch(error => error)
    }
    static saveshpFile(){
        return storage.get('geogig').then((data) =>{
            data.infoRepositorios.local[this.id].shpfile.push([...this.shpfile].pop());
            storage.put(data);
            return data;
        }).catch(error => error)
    }
    saveRemoteConnection(newObj){
        this._mydb.open().then((data) => {
            data.infoRepositorios.conectedIn.push(newObj);
            this._mydb.set(data);
        })
    }
    updateRemoteRepositories(id, repositories){
        this._mydb.open().then((data) => {
            data.infoRepositorios.conectedIn = $s.mydb.infoRepositorios.conectedIn;
            this._mydb.set(data);
        })
        swal("Update", repositories.length +" Repository successfully imported!", "success")
    }

}