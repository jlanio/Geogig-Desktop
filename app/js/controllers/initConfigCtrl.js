const geogigJS = require('./../geogig-js/main')
const {dialog} = require('electron').remote;

const geogig = new geogigJS({
  bin: "C:\\geogig\\bin\\geogig.bat",
  cwd: "C:\\patchForRepository"
});

function initConfigCtrl($scope, $location, $translate){
	s = $scope
	s.mydb = mydb
  s.geogig = geogig
  s.geogigServe = geogig.serve.connect({uri: 'http://localhost:8182'})
	//Seting config user after start app
	let configUser = LocalStorage.get('configUser');
	!configUser ? $location.path('/main/config_user') : $translate.use(configUser.language);
	//End Seting config user

	s.selectRepo = (selectedName) => {
    s.currentRepoName = selectedName
    s.currentRepo = s.geogigServe.repos.findOne({name: `${selectedName}`})
	}

	s.selectServeRemote = (selectedFild) => {
		LocalStorage.set('serveRemoteAtivo', selectedFild);
		$location.path('/main/view_remoto');
	};
	s.currentServeRemoteId = () => LocalStorage.get('serveRemoteAtivo');
	s.currentRepoRemoteData = () => s.mydb.infoRepositorios.conectedIn[s.currentServeRemoteId()];

  s.checkTask =  'asdasdasdasd';

}
function config ($translate, $location, toaster){
	s.saveConfig = (config) => {
		$translate.use(config.language);
		LocalStorage.set('configUser', config);
		toaster.success({ body:"Configuration saved successfully."});
        Utils.geogig(['config', '--global','user.name', config.username]).then(
            Utils.geogig(['config', '--global','user.email', config.email])
        ).catch(()=> 'error')
		$location.path('/main/local');
	}
	s.getConfig = () => LocalStorage.get('configUser');
}

angular
.module('geogig-desktop')
.controller('initConfigCtrl', initConfigCtrl)
.controller('config', config)
