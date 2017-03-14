class remote {
    /*infoRepositorios.local*/
    constructor(name, remoteAdress, repos, origin, mydb) {
        this.name = name;
        this.remoteAdress = remoteAdress;
        this.repos = repos;
        this.origin = origin;
        this.mydb = mydb;
    }
    save() {
        let new_data = this.mydb;
        new_data.infoRepositorios.remote.push({
            "name":this.name,
            "url":this.remoteAdress,
            "repos":[],
            "origin":this.origin
        });
    return new_data
    }
}