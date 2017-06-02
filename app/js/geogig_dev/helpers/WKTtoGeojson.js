class WKTtoGeojson {

	static init (q){
		let _wkt = new Wkt.Wkt();
		let _geojson = getJson.geojson();
		q.response.Feature.forEach((element, index)=>{
			let feature_id = element.id;
			let type_change = element.change;
			let geometry = _wkt.read(element.geometry[0]
			.replace('MULTIPOLYGON (((', 'POLYGON ((')
			.replace(')))', '))')).toJson();
			_geojson.features.push({
				"type":"Feature",
					"properties":{
						"feature_id":feature_id,
						"type_change":type_change
					},
					"geometry":geometry
			})
		});
		return _geojson

	}

} 