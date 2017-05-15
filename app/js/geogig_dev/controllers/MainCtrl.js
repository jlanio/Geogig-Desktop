class MainCtrl {
	constructor(name,  serverAddress = `http://localhost:8182/repos/${name}`, shpfile = []){
		this._Repository = new Repository(name, serverAddress);
		this._RepositoryLocal = new RepositoryLocal(name, serverAddress, shpfile);
		this._RepositoryRemote = new RepositoryRemote(name, serverAddress)
	}
	get Repository(){
		return this._Repository
	}
	get RepositoryLocal(){
		return this._RepositoryLocal
	}
	get RepositoryRemote(){
		return this._RepositoryRemote
	}
	new(){
		return this._Repository.init().then(
			this._RepositoryLocal.new()
		)

	}
	update(id, name, localShp){
		this._RepositoryLocal.newShpFile(id, name, localShp);
	}
	delete(){

	}
	newRemoteConnection(data){
		this._RepositoryRemote.new(data.repos.repo)
	}
	updateRemoteRepositories(id, repositories){
		this._RepositoryRemote.updateRemoteRepositories(id, repositories)
	}
}