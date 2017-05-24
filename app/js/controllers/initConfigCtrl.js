function initConfigCtrl($scope, $location){
	$s = $scope;
	$s.mydb = mydb;
	ping.server('http://localhost:8182/repos')
		.then(q=>console.log(q))
		.catch(q=>Repository.initServer())

	generatorRepositoryObj = function (id){
		let get = $s.mydb.infoRepositorios.local[id];
		return new Repository(get.name, id, get.serverAddress, get.shpfile, get.type);
	}
	$s.selectRepo = (selectedFild) => {
		db.setItem('repoLocalAtivo', selectedFild);
		$location.path('/main/view');
	}
	$s.selectServeRemote = (selectedFild) =>{
		db.setItem('serveRemoteAtivo', selectedFild);
		$location.path('/main/view_remoto');
	};
	$s.currentRepoId = () => db.openItem('repoLocalAtivo');
	$s.Repository = () => generatorRepositoryObj($s.currentRepoId());
	$s.currentServeRemoteId = () => db.openItem('serveRemoteAtivo');
	$s.lastRepoId = () => $s.mydb.infoRepositorios.local.length - 1;
	$s.currentRepoRemoteData = () => $s.mydb.infoRepositorios.remoto[$s.currentServeRemoteId()];
	
}
angular
.module('geogig-desktop')
.controller('initConfigCtrl', initConfigCtrl)

