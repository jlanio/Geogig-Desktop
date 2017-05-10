class RepositoryRemote extends SaveRepository {
    constructor(name, serverAddress, repos) {
        super(name, serverAddress);
        this._repos = repos;
    }
    new() {
        super.saveConexao(
            GeneratorJson.remote(this._name, this._serverAddress, this._repos)
        );
    }
    updateRepos(){

    }
}