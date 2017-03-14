class Local extends Repository {
    constructor(name, shpfile, origin, remoteAdress, description, mydb) {
        super(name, shpfile, origin, remoteAdress);
        this.description = description;
        this.mydb = mydb;
    }

    save() {
        let new_data = this.mydb;
            new_data.infoRepositorios.local.push({
                "name":this.name,
                "shpfile":this.shpfile,
                "description":this.description,
                "origin":{"in":this.origin,"into":this.dir},
                "remote":"http://localhost:8182/repos/"+this.remoteAdress
            });
        db.set(new_data);
        return "Sucess!";
    }
    updateFile(id, name, localShp) {
        let new_data = this.mydb;
            new_data.infoRepositorios.local[id].shpfile.push({'name':name,'localDir':localShp});
        db.set(new_data);
        return "Updade Sucess!";
    }
}
