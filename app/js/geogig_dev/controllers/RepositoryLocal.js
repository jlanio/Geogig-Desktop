class RepositoryLocal extends SaveRepository {
    constructor(name, origin, serverAddress, shpfile = []){
        super(name, origin, serverAddress);
        this._shpfile = shpfile;
    }
    new() {
        super.saveLocal(
            GeneratorJson.local(this.name, this._shpfile, this.origin, this.serverAddress)
        );
    }
    newShpFile(id, name, localShp) {
        super.saveshpFile(id, name, localShp);
    }
    get ShpFile (){
        return this._shpfile;
    }
}