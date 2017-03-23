class Ctrl {
	constructor(name, type = 'local',  address = `http://localhost:8182/repos/${name}`){
		this.Repository = new Repository(name, type, address);
		this.Local = new Local(name, type, address);
	}
	new(callback){
		this.Repository.init(q=>callback(q))
		this.Local.new();
	}
	update(id, name, localShp){
		this.Local.shpFile(id, name, localShp);
	}
	delete(){

	}

}
/*let a = new Ctrl('xzzXzzzz','remote');
a.update(12,'Amazonas','c:asdad')
*/