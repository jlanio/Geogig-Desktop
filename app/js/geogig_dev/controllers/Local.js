class Local extends CtrlRepository {
    constructor(name, origin, serverAddress, shpfile = []){
        super(name, origin, serverAddress);
        this.shpfile = shpfile;
    }
    new() {
        super.saveLocal(
            GeneratorJson.local(this.name, this.shpfile, this.origin, this.serverAddress)
        );
    }
    shpFile(id, name, localShp) {
        super.saveshpFile(id, GeneratorJson.shpfile(name, localShp));
    }
}