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
	static remote (name, serverAddress, repos){
		return {
	            'name': name,
	            'serverAddress': serverAddress,
	            'repos': repos
        		}
	}
/*	static shpfile (){
		return {
				'name':this._name,'shpfile':this._shpfile
				}
	}*/
	static geojson (){
		return {
			"type": "FeatureCollection",
			"features":[]
		}
	}
}
