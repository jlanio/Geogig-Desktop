class GeneratorJson{
	static init (){
		return {
				'_id':'geogig',
				'infoRepositorios':{'local':[],'conectedIn':[]}
				}
	}
	static local(name, shpfile, serverAddress){
		return {
            	'name':name,
            	'shpfile':shpfile,
            	'serverAddress':serverAddress,
            	'origin': 'local'
            	};
	}
	static remote (name, serverAddress, repos){
		return {
	            'name': name,
	            'serverAddress': serverAddress,
	            'repos': repos
        		}
	}
	static shpfile (name, localShp){
		return {
				'name':name,'shpfile':localShp
				}
	}
	static geojson (){
		return {
			"type": "FeatureCollection",
			"features":[]
		}
	}
}
