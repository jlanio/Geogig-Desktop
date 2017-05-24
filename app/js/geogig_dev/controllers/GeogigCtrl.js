class Geogig {
    static init(){
        return Promise.all([this.init(), CtrlDB.saveLocal.call(this)])
    }
    static importShapefile(){
    	return Promise.all([
    		this.importShapefile(), 
    		CtrlDB.saveshpFile.call(this)
    		]);
    }
    static add(){
    	return Promise.all([this.add()]);
    }
    static analyze(){
    	
    }
    static commit (comment){
    	return Promise.all([Commit.new.call(this, comment)])
    }
}


/*let imovel = new Repository('xjoven_guanabara');*/
/*Geogig.init.call(imovel)
	.then(q => console.log(q))
	.catch(q => console.log(q))


*/
/*imovel.id = 1;
imovel.shpfile.push({'name':'Acre','shpfile':'C:\\Users\\jlanio\\Desktop\\app\\imovel.shp'})
*/
/*Geogig.importShapefile.call(imovel).then(q => console.log(q))*/
/*Geogig.add.call(imovel).then(q => console.log(q))*/
/*Geogig.commit.call(imovel, 'testando').then(q => console.log(q))*/














/*class MainCtrl {
	constructor(name,  serverAddress = `http://localhost:8182/repos/${name}`, shpfile = []){
		this._RepositoryLocal = new RepositoryLocal(name, serverAddress, shpfile);
		this._RepositoryRemote = new RepositoryRemote(name, serverAddress)
	}
	get Local(){
		return this._RepositoryLocal
	}
	get Remote(){
		return this._RepositoryRemote
	}

	delete(){

	}
	newRemoteConnection(data){
		this.Remote.action.new(data.repos.repo)
	}
	updateRemoteRepositories(id, repositories){
		this._RepositoryRemote.updateRemoteRepositories(id, repositories)
	}
}*/