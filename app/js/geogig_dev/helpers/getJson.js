class getJson{
	static init (){
		return {
				'_id':'geogig',
				'infoRepositorios':{'local':[],'conectedIn':[]}
				}
	}
	static local(){
		return {
				'_id': new Date().toJSON(),
            	'name': this._name,
            	'shpfile': this._shpfile,
            	'serverAddress': this._serverAddress,
            	'type': this._type,
            	'isActive': true
            	};
	}
	static remote (repos){
		return {
	            'name': this.name,
	            'origin': this.origin,
	            'serverAddress': this.url,
	            'repos': repos.repos
        		}
	}
	static shpfile (name, shpfile){
		return {
				'name':name,'shpfile':shpfile
				}
	}
	static geojson (){
		return {
			"type": "FeatureCollection",
			"features":[]
		}
	}
}
