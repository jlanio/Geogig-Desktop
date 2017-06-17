class Geogig {
    static init(){
        return Promise.all([this.init(), db.saveLocal.call(this)])
    }
    static importShapefile(){
    	return Promise.all([
    		this.importShapefile([...this.shpfile].pop()), 
    		db.saveshpFile.call(this)
    		]);
    }
    static add(){
    	return Promise.all([this.add()]);
    }
    static commit (comment){
    	return Promise.all([Commit.new.call(this, comment)])
    }
    static analyze(){
    	let actions = this.shpfile.map(q => this.importShapefile(q));
    	return Promise.all(actions);
    }
    static log(){
        return this.log()
    }
    static diffCommit(thisCommit, toCompare) {
        return Commit.diffCommit.call(this, thisCommit, toCompare);
    }
    static ConnectRemote (remoteObj , dataObj){
        return Promise.all ([db.saveRemoteConnection(remoteObj , dataObj)])
    }
    static updateRemoteRepositories(id, dataObj){
        db.updateRemoteConnection(id, dataObj);
    }
    static clone (){
        return this.ls().then(shpfile => {
            this.shpfile = shpfile;
            this.clone();
            this.addRemote();
            db.saveLocal.call(this);
            return this
        });
    }
    static pull (){
        return Promise.all ([this.pull()])
    }
    static push (){
        return Promise.all ([this.push()])
    }
}