class ConectedIn extends CtrlRepository {
    constructor(name, origin, serverAddress, repos) {
        super(name, origin, serverAddress);
        this.repos = repos;
    }
    new(){
        super.saveConexao(
            GeneratorJson.remote(this.name, this.origin, this.serverAddress, this.repos)
            );
    }
    updateRepos(){

    }
}