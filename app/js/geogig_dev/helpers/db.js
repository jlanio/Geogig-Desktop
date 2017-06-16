const storage = new PouchDB('db');

class db {

    static saveLocal(){
        return storage.get('geogig').then((data) => {
            data.infoRepositorios.local.push(getJson.local.call(this));
            storage.put(data);
            s.$apply(() => s.mydb = data)
            return data
        }).catch(error => error)
    }
    static saveshpFile(){
        return storage.get('geogig').then((data) => {
            data.infoRepositorios.local[this.id].shpfile.push([...this.shpfile].pop());
            storage.put(data);
            s.$apply(() => s.mydb = data)
            return data;
        }).catch(error => error)
    }
    static saveRemoteConnection(remoteObj , dataObj){
        return storage.get('geogig').then((data) => {
            data.infoRepositorios.conectedIn.push(getJson.remote.call(remoteObj, dataObj));
            storage.put(data);
            s.$apply(() => s.mydb = data)
            return data
        }).catch(error => error)
    }
    static updateRemoteConnection(id, dataObj){
        return storage.get('geogig').then((data) => {
            data.infoRepositorios.conectedIn[id].repos = dataObj.repos;
            storage.put(data);
            s.$apply(() => s.mydb = data)
            return data;
        }).catch(error => error)
    }
    static updateshpFile(){
        return storage.get('geogig').then((data) => {
            data.infoRepositorios.local[this.id].shpfile = this.shpfile;
            storage.put(data);
            s.$apply(() => s.mydb = data)
            return data;
        }).catch(error => error)
    }

}