class LocalStorage{
	static get(key){
		return JSON.parse(JSON.parse(window.localStorage.getItem(key)));
	}
	static set(key, value){
		return window.localStorage.setItem(key, JSON.stringify(value));
	}
}
	