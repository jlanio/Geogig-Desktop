const storage = new PouchDB('db');

class db {

    static saveLocal(){
        storage.get('geogig').then((data) => {
            data.infoRepositorios.local.push(getJson.local.call(this));
            return storage.put(data)
        }).then(() => storage.get('geogig'))
        .then((data) => {
            s.$apply(() => s.mydb = data)
        })
    }
    static saveshpFile(){
        storage.get('geogig').then((data) => {
            data.infoRepositorios.local[this.id].shpfile.push([...this.shpfile].pop());
            storage.put(data);
        }).then(() => storage.get('geogig'))
        .then((data) => {
            s.$apply(() => s.mydb = data)
        }).catch(error => error)
    }
    static saveRemoteConnection(remoteObj , dataObj){
        storage.get('geogig').then((data) => {
            data.infoRepositorios.conectedIn.push(getJson.remote.call(remoteObj, dataObj));
            storage.put(data);
        }).then(() => storage.get('geogig'))
        .then((data) => {
            s.$apply(() => s.mydb = data)
        }).catch(error => error)
    }
    static updateRemoteConnection(id, dataObj){
        storage.get('geogig').then((data) => {
            data.infoRepositorios.conectedIn[id].repos = dataObj.repos;
            storage.put(data);
        }).then(() => storage.get('geogig'))
        .then((data) => {
            s.$apply(() => s.mydb = data)
        }).catch(error => error)
    }
    static updateshpFile(){
        storage.get('geogig').then((data) => {
            data.infoRepositorios.local[this.id].shpfile = this.shpfile;
            storage.put(data);
            }).then(() => storage.get('geogig'))
        .then((data) => {
            s.$apply(() => s.mydb = data)
        }).catch(error => error)
    }
    static removeLocalRepository (idRemository){
        storage.get('geogig').then((data) => {
            if (idRemository > -1) data.infoRepositorios.local.splice(idRemository, 1);   
            return storage.put(data)
        }).then(() => storage.get('geogig'))
        .then((data) => {
            s.$apply(() => s.mydb = data)
        })
    }
    static removeConexaoRemote (idRemository){
         storage.get('geogig').then((data) => {
            if (idRemository > -1) data.infoRepositorios.conectedIn.splice(idRemository, 1);   
            return storage.put(data)
        }).then(() => storage.get('geogig'))
        .then((data) => {
            s.$apply(() => s.mydb = data)
        })
    }

}