function repositorio_remoto($scope, db, $location, $http, repo, toaster){

	$scope.mydb = mydb;
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
		console.log(remoto);
		if (remoto.origin === 'rede_local'){
			$http.get(remoto.url+"repos.json").success(function(data){
			const a  = $scope.mydb;
			a.infoRepositorios.remoto.push(
			{
				"nome":remoto.titulo,
				"url":remoto.url,
				"repos":[]
			});
			db.set(a);
			const b = $scope.mydb;
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
			console.log(data);
			}).error(function(){
				toaster.pop({
					type: 'error',
					title: 'Deu ruim!',
					body: 'Servidor não encontrado ou URL inválida.',
					showCloseButton: true
				});
			});
		}else if (remoto.origin === 'geoserver'){
			$http.get(remoto.url+"geoserver/geogig/repos.json").success(function(data){
			const a  = $scope.mydb;
			a.infoRepositorios.remoto.push(
			{
				"nome":remoto.titulo,
				"url":remoto.url,
				"repos":[]
			});
			db.set(a);
			const b = $scope.mydb;
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
			console.log(data);
			}).error(function(){
				toaster.pop({
					type: 'error',
					title: 'Deu ruim!',
					body: 'Servidor não encontrado ou URL inválida.',
					showCloseButton: true
				});
			});
		}else if (remoto.origin === 'postgresql'){
			console.log('executa postgresql');
		}else {
			console.log('Nao existe metodo');
		}
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
		if(typeof angular.fromJson(window.localStorage['commit']).response.commit[1] === 'undefined'){
			const umCommit = angular.fromJson(window.localStorage['commit']).response.commit;
			const a = [];
			a.push(umCommit)
			return a;
		}else{
			return angular.fromJson(window.localStorage['commit']).response.commit;
		}
		

	}
	$scope.load = Openlog();

	$scope.push = function(type){
		repo.push($scope.currentRepoData().nome,type,(error, stdout, stderr)=>{
			console.log(stdout);
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
			console.log(stdout);
			toaster.pop({
				type: 'error',
				title: 'Deu ruim!',
				body: "pull" ,
				showCloseButton: true
			});
		})	
	}
	$scope.clone = function(id, nome, url){
		repo.clone(url, nome ,function(error, stdout, stderr){
			var a = $scope.mydb;
			a.infoRepositorios.local.push(
			{
				"nome":nome,
				"arquivos":[],
				"descricao":"",
				"origin":"remote",
				"remote": url.replace(".json","")
			});

			db.set(a);
			var b = $scope.mydb;
			swal("", stdout +"");
			console.log(error, stdout, stderr);

			ls(url, (data)=>{
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


}
angular
.module('gitgeo')
.controller('repositorio_remoto', repositorio_remoto)