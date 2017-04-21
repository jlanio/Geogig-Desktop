function repositorio_remoto($scope, $location, $http, toaster){
	let current = $s.currentRepoData();
	let ctrl = new Ctrl(current.name, current.origin, current.serverAddress, current.shpfile);
	
	$s.log = ()=>{
		ctrl.Repository.log(ctrl.Repository._serverAddress)
		.then(q=>{
			/*Criar uma condição para quando resultado for vazio*/
			LocalStorage.set('commit', q),
			$location.path('/repo/historico')
		}).catch(q=>console.error(q))
	}
	$s.loadlogCommit = ()=>{
		return angular.fromJson(LocalStorage.get('commit')).response.commit;
	}
	$s.clone = function(name, repoAddress){	
		repoAddress = repoAddress.replace('.json','');
		let rp = new Repository(name,'remote', repoAddress);
		let rpObj = new Local(name,'remote', repoAddress, $s.mydb, []);

		rp.clone((error, stdout, stderr)=>{
			rpObj.new();
			rp.ls(data=>{
				data.response.node.forEach(entry=>
					rpObj.shpFile($s.lastRepoId(), entry.path, '')
				);
			});
			swal("", stdout +"");
		});
	}
	getRepositorio_remote = function (data, z){
		let b = $s.mydb;
		b.infoRepositorios.remoto[z].repos = [];
		for (x in data.repos.repo){
			b.infoRepositorios.remoto[z].repos.push(
			{
				"nome":data.repos.repo[x].name,
				"id":data.repos.repo[x].id,
				"href":data.repos.repo[x].href
			});
		}
		db.set(b);
	}

	function get (url, id){
			$http.get(url).success((data)=>{
				getRepositorio_remote(data, id);
			}).error(()=>{
				toaster.pop({
					type: 'error',
					title: 'Servidor Offline',
					body: url,
					showCloseButton: true
				});
			})
		}
	$s.remoteAtualize = function (){
		for (conexao in $s.mydb.infoRepositorios.remoto){
			get($s.mydb.infoRepositorios.remoto[conexao].url, conexao);
		}

	}
	

	$s.push = function(type){
		repo.push($s.currentRepoData().nome, type, function(error, stdout, stderr){
			console.log("OK");
			toaster.pop({
				type: 'error',
				title: 'Deu ruim!',
				body: "Push",
				showCloseButton: true
			});
		})
	}
	$s.pull = function(type){
		repo.pull($s.currentRepoData().nome, type,(error, stdout, stderr)=>{
			toaster.pop({
				type: 'error',
				title: 'Deu ruim!',
				body: "pull" ,
				showCloseButton: true
			});
		})
	}
	function shp_export(_Name, type, objeto, localSave){
		repo.shp_export(_Name, type, objeto, localSave, function(error, stdout, stderr){
			console.log(error, stdout, stderr);
		})
	}
	$s.baixar_shp = function (_Name, objeto, key){
		const {dialog} = require('electron').remote;
		dialog.showOpenDialog({
	  		properties: [ 'openFile', 'openDirectory'] }, function (filename) {
	    		var localSave = filename.toString();
	    		shp_export(_Name, 'remoto',objeto, localSave)
	    		const tmp = $s.mydb;
	    		tmp.infoRepositorios.local[$s.currentRepoId()].arquivos[key].localDir = localSave+'\\'+objeto.nome+'.shp';
	    		db.set(tmp);
	  		}
		);
	}
	$s.compareCommit = function (load){
		var commidId = [];
		load.forEach(element=>element.activate ? commidId.push(element.id) : false);
		geojsonGenerate = {
			"type": "FeatureCollection",
			"features":[]
		}
		geojsonGenerateDiff = {
			"type": "FeatureCollection",
			"features":[]
		}
		new Commit(ctrl.Repository, null, commidId[1], commidId[0])
		.diffCommit()
		.then(q=>{
			console.log(WKTtoGeojson.init(q));
		}).catch(q=>console.log(q))
		/*repo.diffCommit($s.currentRepoData().remote, commidId[0],commidId[1],(data)=>{
				var wkt = new Wkt.Wkt();
			for (x in data.response.Feature){
		        var wkt_geom = (data.response.Feature[x].geometry);
				geometry = wkt_geom[0].replace('MULTIPOLYGON (((', 'POLYGON ((')
									  .replace(')))', '))');
				type_change = data.response.Feature[x].change;
				feature_id = data.response.Feature[x].id;

		        wkt.read(geometry);
				wkt.toObject();
				geojsonGenerate.features.push({"type":"Feature","properties":{
												"feature_id":feature_id,
												"type_change":type_change
											},
											"geometry":wkt.toJson()
											});

		      }
			localStorage.setItem("geojson", JSON.stringify(geojsonGenerate));
			$location.path('/repo/map');
			for (x in geojsonGenerate.features){
				if(geojsonGenerate.features[x].properties.type_change == "MODIFIED"){
					repo.diffFeature($s.currentRepoData().remote, geojsonGenerate.features[x].properties.feature_id,commidId[0],commidId[1],(data)=>{
						for (y in ad = data.response.diff){
							newvalue = data.response.diff[y].newvalue.replace('MULTIPOLYGON (((', 'POLYGON ((')
									  .replace(')))', '))');
							oldvalue = data.response.diff[y].oldvalue.replace('MULTIPOLYGON (((', 'POLYGON ((')
									  .replace(')))', '))');
							wkt.read(newvalue);
							wkt.toObject();
							console.log(JSON.stringify(wkt.toJson()));
							geojsonGenerateDiff.features.push({"type":"Feature","properties":{
														"feature_id":'feature_id',
														"type_change":'type_change'
													},
													"geometry":wkt.toJson()
													});
						};
						localStorage.setItem("geojsonfeature", JSON.stringify(geojsonGenerateDiff));

					});
				}
			}
		})*/

	}



}
angular
.module('geogig-desktop')
.controller('repositorio_remoto', repositorio_remoto)
