function db(){
	var db = new PouchDB('db_data_3');
	var db_init = {"_id":"geogig","infoRepositorios":{"local":[],"remoto":[]}}

	db.get('geogig').catch(function (err) {
	  if (err.name === 'not_found') {
	    db.put(db_init)
	  }
	})
		
	//LocalStorage
	var _open = function(){
		return db.get('geogig');
	};

	var _set = function(new_data){
		db.get('geogig').then(function (data) {
			data.infoRepositorios = new_data.infoRepositorios;
		   	db.put(data);
		})
	};
	
	//SessionStorage
	var _SetItem = function(key,value){
		return window.sessionStorage.setItem(key, value);
	};
	var _OpenItem = function(key){
		return window.sessionStorage.getItem(key);
	};

	return {
		open: _open,
		set: _set,
		SetItem: _SetItem,
		OpenItem: _OpenItem
	};
};

angular
.module("gitgeo")
.factory("db", db)
