class ConectedIn extends CtrlRepository {
    constructor(name, origin, serverAddress, mydb, repos) {
        super(name, origin, serverAddress, mydb);
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