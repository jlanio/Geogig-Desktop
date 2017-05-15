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
}