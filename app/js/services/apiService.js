function API($http,config,db){
	var _login = function(login){
		return $http.post(config.baseUrl+"/login",login)
	};
	var _getRecurso = function(token){
		return $http.get(config.baseUrl+"/api/user",{headers: {'Authentication-Token': token}});
	};
	var _putRecurso = function(DataAtualize){
		return $http.put(config.baseUrl+"/api/user/"+db.open()[0].id, DataAtualize,{headers: {'Authentication-Token': db.OpenToken()}});
	};
	var _postRecurso = function(DataNew){
		return $http.post(config.baseUrl+"/api/banco", DataNew);
	}
	return {
		login: _login,
		get : _getRecurso,
		put : _putRecurso,
		post: _postRecurso
	};
};

angular
.module("geogig-desktop")
.factory("API", API)
