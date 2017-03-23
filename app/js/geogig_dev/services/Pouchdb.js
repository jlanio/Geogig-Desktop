class Database{
	constructor(){
		this.db = new PouchDB('db');
	}
	open(){
		this.db.get('geogig').catch(err=> {
		  if (err.name === 'not_found') {
		    this.db.put(GeneratorJson.init())
		  }
		})
		return this.db.get('geogig');
	}
	set(new_record){
		this.open().then(data=>{
			data.infoRepositorios = new_record.infoRepositorios;
			this.db.put(data)
		})
	}

}