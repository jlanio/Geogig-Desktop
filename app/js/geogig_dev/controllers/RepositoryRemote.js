class RepositoryRemote extends SaveRepository {
    constructor(name, origin, serverAddress, repos) {
        super(name, origin, serverAddress);
        this._repos = repos;
    }
    new() {
        super.saveConexao(
            GeneratorJson.remote(this.name, this.origin, this.serverAddress, this._repos)
        );
    }
    updateRepos(){

    }
}