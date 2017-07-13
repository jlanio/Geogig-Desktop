function initConfigCtrl($scope, $state, $translate){
	s = $scope;
	s.mydb = mydb;
	s.working = false;
	//Seting config user after start app
	let configUser = LocalStorage.get('configUser');
	!configUser ? $state.go('main.config') : $translate.use(configUser.language);

	//End Seting config user

	ping.checkServerisOffAndStart()
		.then(e => console.log(e))
		.catch(e => console.log(e))

	s.selectRepo = (selectedFild) => {
		LocalStorage.set('repoLocalAtivo', selectedFild);
	}
	s.selectServeRemote = (selectedFild) => {
		LocalStorage.set('serveRemoteAtivo', selectedFild);
		$state.go('main.view_remoto');
	};
	generatorRepositoryObj = () => {
		let id = LocalStorage.get('repoLocalAtivo')
		let get = s.mydb.infoRepositorios.local[id];
		let remote = new Repository(get.name+'.remote', id, get.serverAddress.replace('.json','.remote.json'), get.shpfile, get.type);
		let local = new Repository(get.name, id, get.serverAddress, get.shpfile, get.type);
		return get.type === 'remote' ? remote : local;
	}
	s.Repository = () => generatorRepositoryObj();
	s.currentServeRemoteId = () => LocalStorage.get('serveRemoteAtivo');
	s.currentRepoRemoteData = () => s.mydb.infoRepositorios.conectedIn[s.currentServeRemoteId()];


}
function config ($translate, $state, toaster){
	s.saveConfig = (config) => {
		console.log(config)
		$translate.use(config.language);
		LocalStorage.set('configUser', config);
		toaster.success({ body:"Configuration saved successfully."});
        Utils.geogig(['config', '--global','user.name', config.username]).then(
            Utils.geogig(['config', '--global','user.email', config.email])
        ).catch(()=> 'error')
		$state.go('main.local');
	}
	s.getConfig = () => LocalStorage.get('configUser');
}

angular
.module('geogig-desktop')
.controller('initConfigCtrl', initConfigCtrl)
.controller('config', config)
