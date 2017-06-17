class getJson{
	static init (){
		return {
				'_id':'geogig',
				'infoRepositorios':{'local':[],'conectedIn':[]}
				}
	}
	static local(){
		return {
            	'name': this._name,
            	'shpfile': this._shpfile,
            	'serverAddress': this._serverAddress,
            	'type': this._type
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
