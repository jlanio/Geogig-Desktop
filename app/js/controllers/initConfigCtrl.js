function initConfigCtrl($scope, $location){
	$s = $scope;
	$s.mydb = mydb;
	ping.server('http://localhost:8182/repos')
		.then(q=>console.log(q))
		.catch(q=>Repository.initServer())

	generatorRepositoryObj = (id) => {
		let get = $s.mydb.infoRepositorios.local[id];
		return new Repository(get.name, id, get.serverAddress, get.shpfile, get.type);
	}
	$s.selectRepo = (selectedFild) => {
		LocalStorage.set('repoLocalAtivo', selectedFild);
	}
	$s.selectServeRemote = (selectedFild) =>{
		LocalStorage.set('serveRemoteAtivo', selectedFild);
		$location.path('/main/view_remoto');
	};
	$s.Repository = () => generatorRepositoryObj(LocalStorage.get('repoLocalAtivo'));
	$s.currentRepoRemoteData = () => $s.mydb.infoRepositorios.remoto[LocalStorage.get('serveRemoteAtivo')];
	
}
angular
.module('geogig-desktop')
.controller('initConfigCtrl', initConfigCtrl)

