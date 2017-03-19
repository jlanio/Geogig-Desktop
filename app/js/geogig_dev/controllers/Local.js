class Local extends CtrlRepository {
    constructor(name, origin, serverAddress, mydb, shpfile = []){
        super(name, origin, serverAddress, mydb);
        this.shpfile = shpfile;
    }
    new() {
        console.log( GeneratorJson.local(this.name, this.shpfile, this.origin, this.serverAddress));
        super.saveLocal(
            GeneratorJson.local(this.name, this.shpfile, this.origin, this.serverAddress)
        );
    }
    shpFile(id, name, localShp) {
        super.saveshpFile(id, GeneratorJson.shpfile(name, localShp));
    }
}
