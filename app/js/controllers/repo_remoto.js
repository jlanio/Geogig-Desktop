function repositorio_remoto($scope,db,$location,$http,repo){

	$scope.selectServeRemote = function(selectedFild){
		db.SetItem('serveRemoteAtivo',selectedFild);
		$location.path('/repo/view_remoto');
	};
	$scope.currentServeRemoteId = function(){
		return db.OpenItem('serveRemoteAtivo'); 
	};
	$scope.currentRepoRemoteData = function(){
		return $scope.mydb.infoRepositorios.remoto[$scope.currentServeRemoteId()]; 
	};

	$scope.selectRepoRemote = function(selectedFild){
		db.SetItem('repoRemoteAtivo',selectedFild);
		return $location.path('/repo/remoto_repo');
	};
	$scope.currentRepoRemoteId = function(){
		return db.OpenItem('repoRemoteAtivo'); 
	};
	$scope.addReporemoto = function (remoto) {
		$http.get(remoto.url+"geoserver/geogig/repos.json").success(function(data){
			const a  = db.open();
			a.infoRepositorios.remoto.push(
			{
				"nome":remoto.titulo,
				"url":remoto.url,
				"repos":[]
			});
			db.set(a);
			const b = db.open();
			for (x in data.repos.repo){
				b.infoRepositorios.remoto[b.infoRepositorios.remoto.length - 1].repos.push(
				{
					"nome":data.repos.repo[x].name,
					"id":data.repos.repo[x].id,
					"href":data.repos.repo[x].href
				});
				db.set(b);
				$scope.cancel();
			}
		}).error(function(){
			toaster.pop({
				type: 'error',
				title: 'Deu ruim!',
				body: 'Servidor não encontrado ou URL inválida.',
				showCloseButton: true
			});
		});
	} 
	$scope.log = function (){
		repo.log($scope.currentRepoData().remote,function(data){
			$location.path('/repo/historico');
			window.localStorage['commit'] = angular.toJson(data);
		});
	}
	var Openlog = function(){
		if(typeof angular.fromJson(window.localStorage['commit']).response.commit[1] === 'undefined'){
			const umCommit = angular.fromJson(window.localStorage['commit']).response.commit;
			const a = [];
			a.push(umCommit)
			console.log(a);
			return a;
		}else{
			return angular.fromJson(window.localStorage['commit']).response.commit;
		}
		

	}
	$scope.load = Openlog();

	$scope.push = function(){
		repo.push($scope.currentRepoData().nome,(error, stdout, stderr)=>{
			console.log(error, stdout, stderr);
		})

	}
	$scope.pull = function(){
		repo.pull($scope.currentRepoData().nome,(error, stdout, stderr)=>{
			console.log(error, stdout, stderr);
		})	
	}

	$scope.clone = function(id, nome, url){
		repo.clone(url, nome ,function(error, stdout, stderr){
			var a = db.open();
			a.infoRepositorios.local.push(
			{
				"nome":nome,
				"arquivos":[],
				"descricao":"",
				"origin":"remote",
				"remote": url.replace(".json","")
			});

			db.set(a);
			var b = db.open();
			swal("", stdout +"");
			console.log(error, stdout, stderr);

			ls(nome, (data)=>{
				for (x in data){
					b.infoRepositorios.local[b.infoRepositorios.local.length - 1]
					.arquivos.push(data[x]);
				}
				db.set(b);
			});

			
		})
	}
	function ls (_Name, ressult){
		repo.ls(_Name, function(data){
			if (typeof data.response.node === 'undefined'){
				ressult(undefined)
			}else if (typeof data.response.node.path === 'undefined'){
				//Vário Objetos
				var df = [];
				for (x in data.response.node){
					df.push({"nome":data.response.node[x].path,"localDir":""})
				}
				ressult(df)
			}else{
				ressult([{"nome": data.response.node.path,"localDir":""}])
			}

		});

	}
	function shp_export(_Name, objeto, localSave){
		repo.shp_export(_Name, objeto, localSave, function(error, stdout, stderr){
			console.log(error, stdout, stderr);	
		})
	}
	$scope.baixar_shp = function (_Name, objeto, key){
		const {dialog} = require('electron').remote;
		dialog.showOpenDialog({ 
	  		properties: [ 'openFile', 'openDirectory'] }, function (filename) {
	    		var localSave = filename.toString();
	    		shp_export(_Name, objeto, localSave)
	    		const tmp = db.open();
	    		tmp.infoRepositorios.local[$scope.currentRepoId()].arquivos[key].localDir = localSave+'\\'+objeto.nome+'.shp';
	    		db.set(tmp);
	  		}
		);
	}


}
angular
.module('gitgeo')
.controller('repositorio_remoto', repositorio_remoto)