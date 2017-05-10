class RepositoryLocal extends SaveRepository {
    constructor(name, serverAddress, shpfile = []){
        super(name, serverAddress);
        this._shpfile = shpfile;
    }
    new() {
        return super.saveLocal(
            GeneratorJson.local(this._name, this._shpfile, this._serverAddress)
        );
    }
    newShpFile(id, name, localShp) {
        super.saveshpFile(id, name, localShp);
    }
    get ShpFile (){
        return this._shpfile;
    }
}
