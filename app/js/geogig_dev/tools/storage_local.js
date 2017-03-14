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
                "arquivos":this.shpfile,
                "descricao":this.description,
                "origin":{"in":this.origin,"into":this.dir},
                "remote":"http://localhost:8182/repos/"+this.remoteAdress
            });
        _db.set(new_data);
        return "Sucess!";
    }
}
