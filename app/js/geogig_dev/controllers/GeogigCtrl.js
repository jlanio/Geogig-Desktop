class Geogig {
    static init(){
        return Promise.all([this.init(), CtrlDB.saveLocal.call(this)])
    }
    static importShapefile(){
    	return Promise.all([
    		this.importShapefile([...this.shpfile].pop()), 
    		CtrlDB.saveshpFile.call(this)
    		]);
    }
    static add(){
    	return Promise.all([this.add()]);
    }
    static commit (comment){
    	return Promise.all([Commit.new.call(this, comment)])
    }
    static analyze(){
    	let actions = this.shpfile.map(q=>this.importShapefile(q));
    	return Promise.all(actions);
    }
    static log(){
        return this.log()
    }
}
