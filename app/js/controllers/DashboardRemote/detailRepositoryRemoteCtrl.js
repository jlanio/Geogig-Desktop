function detailRepositoryRemoteCtrl($scope, $location, $http, toaster){
	
	let current = $s.currentRepoData() ? $s.currentRepoData() : '';
	let $geogig = new MainCtrl(current.name, current.serverAddress, current.shpfile);

	$s.history = () => {
		$location.path('/main/historico');
		console.log($s.log());
		$s.loadlogCommit();
	}
	$s.log = ()=>{
		return $geogig.Repository.log(current.serverAddress)
		.then(q=>{
			LocalStorage.set('commit', q)
		}).catch(q=>console.error(q))
	}
	$s.loadlogCommit = () => {
		return angular.fromJson(LocalStorage.get('commit')).response.commit;
	}
	$s.compareCommit = (load) => {
		var commidId = [];
		load.forEach(element=>element.activate ? commidId.push(element.id) : false);
		
		new Commit($geogig.Repository, null, commidId[1], commidId[0])
		.diffCommit()
		.then(q => {
			LocalStorage.set("geojson", WKTtoGeojson.init(q));
			$location.path('/main/map');
		}).catch(q => console.log(q))
	}


	$s.clone = (name, repoAddress) => {
		let ls_tree = repoAddress.replace(".json","/ls-tree.json");
		let $geogig = new MainCtrl(name, repoAddress);
		$geogig.Repository.clone().then(q =>{
			console.log("", q +" ", "")
		})
		$http.get(ls_tree).success(data => {
				$geogig.RepositoryRemote.afterCloningGetFeatures(data);
		})
		.error(data => console.log(error))
	}
	getRepositorio_remote = (id, repositories) => {
		$geogig.updateRemoteRepositories(id, repositories)
	};
	function get (url, index){
			$http.get(`${url}repos.json`).success(data=>{
				getRepositorio_remote(index, data.repos.repo);
			}).error(data=>{
				toaster.pop({
					type: 'error',
					title: 'Servidor Offline',
					body: url,
					showCloseButton: true
				});
			})
		}
	$s.remoteUpdateRepos = () => {
		$s.mydb.infoRepositorios.conectedIn.forEach((conexao, index) =>{
		get(conexao.serverAddress, index)
		})	
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
	



}
angular
.module('geogig-desktop')
.controller('detailRepositoryRemoteCtrl', detailRepositoryRemoteCtrl)
