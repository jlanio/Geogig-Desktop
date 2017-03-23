class Sessionstorage{
	static get(key){
		return JSON.parse(window.sessionStorage.getItem(key));
	}
	static set(key, value){
		return window.sessionStorage.setItem(key, JSON.stringify(value));
	}
}
	