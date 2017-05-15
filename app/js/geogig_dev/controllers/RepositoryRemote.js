class RepositoryRemote extends SaveRepository {
    constructor(name, serverAddress) {
        super(name, serverAddress);
    }
    new(repositories) {
        super.saveRemoteConnection(
            GeneratorJson.remote(this._name, this._serverAddress, repositories)
        );
    }
    updateRemoteRepositories(id, repositories){
        super.updateRemoteRepositories(id, repositories);
    }
    afterCloningGetFeatures(repoAddress){
        super.saveLocal(
            GeneratorJson.local(this._name, this._shpfile, this._serverAddress, 'remote')
        )
        /*console.log(repoAddress);
        repoAddress.forEach(element =>{
            console.log(GeneratorJson.shpfile(element.path))
        })*/
    }
}