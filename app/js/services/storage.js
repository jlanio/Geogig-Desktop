function db(){
//LocalStorage
var _set = function(data){
	window.localStorage['mydb'] = angular.toJson(data);
};
var _open = function(){
	return angular.fromJson(window.localStorage['mydb']);
};	
//SessionStorage
var _SetItem = function(key,value){
	window.sessionStorage.setItem(key, value);
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
