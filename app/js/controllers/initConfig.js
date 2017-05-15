function initial_config($scope, $location){
	$s = $scope;
	$s.mydb = mydb;
	console.log($s.mydb)
	ping.server('http://localhost:8182/repos')
	.then(q=>console.log(q))
	.catch(q=>{
		console.log(q),
		Repository.initServer()
	})
	$s.selectRepo = (selectedFild)=> {
		db.setItem('repoLocalAtivo',selectedFild)
		return $location.path('/main/view')
	}
	$s.selectServeRemote = (selectedFild)=>{
		db.setItem('serveRemoteAtivo',selectedFild);
		$location.path('/main/view_remoto');
	};
	$s.currentRepoId = () => db.openItem('repoLocalAtivo');
	$s.currentServeRemoteId = () => db.openItem('serveRemoteAtivo');
	$s.lastRepoId = () => $s.mydb.infoRepositorios.local.length - 1;
	$s.currentRepoData = () => $s.mydb.infoRepositorios.local[$s.currentRepoId()];
	$s.currentRepoRemoteData = () => $s.mydb.infoRepositorios.remoto[$s.currentServeRemoteId()];
	
}
angular
.module('geogig-desktop')
.controller('initial_config', initial_config)

