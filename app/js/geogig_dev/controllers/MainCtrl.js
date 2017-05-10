class MainCtrl {
	constructor(name,  serverAddress = `http://localhost:8182/repos/${name}`, shpfile = []){
		this._Repository = new Repository(name, serverAddress);
		this._RepositoryLocal = new RepositoryLocal(name, serverAddress, shpfile);
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
	get Repository(){
		return this._Repository
	}
	get RepositoryLocal(){
		return this._RepositoryLocal
	}


}