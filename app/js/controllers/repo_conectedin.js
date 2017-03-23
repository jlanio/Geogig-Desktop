function repositorio_remoto($scope, $location, $http, toaster){
	$scope.clone = function(name, repoAddress){	
		repoAddress = repoAddress.replace('.json','');
		let rp = new Repository(name,'remote', repoAddress);
		let rpObj = new Local(name,'remote', repoAddress, $scope.mydb, []);

		rp.clone((error, stdout, stderr)=>{
			rpObj.new();
			rp.ls(data=>{
				data.response.node.forEach(entry=>
					rpObj.shpFile($scope.lastRepoId(), entry.path, '')
	            );
			});
			swal("", stdout +"");
		});
	}
	getRepositorio_remote = function (data, z){
		let b = $scope.mydb;
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

	$scope.log = function (){
		if ($scope.currentRepoData().remote == ''){
			repo.log($scope.currentRepoData().remote,function(data){
				$location.path('/repo/historico');
				window.localStorage['commit'] = angular.toJson(data);
			});
		}else{
			repo.log($scope.currentRepoData().remote,function(data){
				$location.path('/repo/historico');
				window.localStorage['commit'] = angular.toJson(data);
			});
		}
	}
	var Openlog = function(){
		if (window.localStorage['commit']){
			if(typeof angular.fromJson(window.localStorage['commit']).response.commit[1] === 'undefined'){
				const umCommit = angular.fromJson(window.localStorage['commit']).response.commit;
				const a = [];
				a.push(umCommit)
				return a;
			}else{
				return angular.fromJson(window.localStorage['commit']).response.commit;
			}
		}else{
			console.error('Local Storage commit is not defined');
		}



	}
	$scope.load = Openlog();

	$scope.push = function(type){
		repo.push($scope.currentRepoData().nome, type,function(error, stdout, stderr){
			console.log("OK");
			toaster.pop({
				type: 'error',
				title: 'Deu ruim!',
				body: "Push",
				showCloseButton: true
			});
		})
	}
	$scope.pull = function(type){
		repo.pull($scope.currentRepoData().nome, type,(error, stdout, stderr)=>{
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
	$scope.baixar_shp = function (_Name, objeto, key){
		const {dialog} = require('electron').remote;
		dialog.showOpenDialog({
	  		properties: [ 'openFile', 'openDirectory'] }, function (filename) {
	    		var localSave = filename.toString();
	    		shp_export(_Name, 'remoto',objeto, localSave)
	    		const tmp = $scope.mydb;
	    		tmp.infoRepositorios.local[$scope.currentRepoId()].arquivos[key].localDir = localSave+'\\'+objeto.nome+'.shp';
	    		db.set(tmp);
	  		}
		);
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
	$scope.remoteAtualize = function (){
		for (conexao in $scope.mydb.infoRepositorios.remoto){
			get($scope.mydb.infoRepositorios.remoto[conexao].url, conexao);
		}

	}
	$scope.compareCommit = function (load){
		var commidId = []
		for (x in load){
			if(load[x].activate){
				/*console.log(load[x].id ,load[x].activate);*/
				commidId.push(load[x].id)

			}
		}
		geojsonGenerate = {
			"type": "FeatureCollection",
			"features":[]
		}
		geojsonGenerateDiff = {
			"type": "FeatureCollection",
			"features":[]
		}
		repo.diffCommit($scope.currentRepoData().remote, commidId[0],commidId[1],(data)=>{
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
					repo.diffFeature($scope.currentRepoData().remote, geojsonGenerate.features[x].properties.feature_id,commidId[0],commidId[1],(data)=>{
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
		})

	}



}
angular
.module('geogig-desktop')
.controller('repositorio_remoto', repositorio_remoto)
