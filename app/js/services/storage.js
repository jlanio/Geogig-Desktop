
function db($location){
	var db = new PouchDB('db');
	/*
	db.destroy().then(function () {
		}).catch(function (err) {
	})
*/
	db.get('geogig').catch(function (err) {
	  if (err.name === 'not_found') {
	    db.put({"_id":"geogig","infoRepositorios":{"local":[],"remoto":[]}})
	  	$location.path('/repo/view');
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
