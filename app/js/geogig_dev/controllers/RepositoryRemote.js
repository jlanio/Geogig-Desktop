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
    afterCloningGetFeatures(shapefile){
        let colletionshapefile = []
        shapefile.response.node.forEach(element =>{
            colletionshapefile.push(GeneratorJson.shpfile(element.path))
        })
        super.saveLocal(
            GeneratorJson.local(this._name, colletionshapefile, this._serverAddress, 'remote')
        )
    }
}