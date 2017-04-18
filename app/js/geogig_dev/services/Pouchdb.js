class Database{
	constructor(){
		this._db = new PouchDB('db');
	}
	open(){
		this._db.get('geogig').catch(err=> {
		  if (err.name === 'not_found') {
		    this._db.put(GeneratorJson.init())
		  }
		})
		return this._db.get('geogig');
	}
	set(new_record){
		this.open().then(data=>{
			data.infoRepositorios = new_record.infoRepositorios;
			this._db.put(data);
		})
	}

}

/*new Database().open().then(doc => console.log(doc));*/
/*new PouchDB('db').destroy().then(function () {
		}).catch(function (err) {
})*/