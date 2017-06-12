function initConfigCtrl($scope, $location){
	$s = $scope;
	$s.mydb = mydb;

	$s.checkServerisOffAndStart = function() {
		ping.server('http://localhost:8182/repos')
			.then(q => console.log(q))
			.catch(q => Repository.initServer())
	}();
	
	$s.selectRepo = (selectedFild) => {
		LocalStorage.set('repoLocalAtivo', selectedFild);
	}
	$s.selectServeRemote = (selectedFild) => {
		LocalStorage.set('serveRemoteAtivo', selectedFild);
		$location.path('/main/view_remoto');
	};
	generatorRepositoryObj = () => {
		let id = LocalStorage.get('repoLocalAtivo');
		let get = $s.mydb.infoRepositorios.local[id];
		return new Repository(get.name, id, get.serverAddress, get.shpfile, get.type);
	}
	$s.Repository = () => generatorRepositoryObj();
	$s.currentServeRemoteId = () => LocalStorage.get('serveRemoteAtivo');
	$s.currentRepoRemoteData = () => $s.mydb.infoRepositorios.conectedIn[$s.currentServeRemoteId()];
	
}
angular
.module('geogig-desktop')
.controller('initConfigCtrl', initConfigCtrl)

