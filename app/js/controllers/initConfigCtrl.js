const geogigJS = require('./../geogig-js/main')
const storage = require('electron-json-storage')
const {dialog} = require('electron').remote;

const geogig = function () {
  let config = JSON.parse(window.localStorage.getItem('configUser'));

  return new geogigJS({
    bin: config.bin_geogig,
    cwd: config.patch_geogig
  });
}

function initConfigCtrl($scope, $location, $translate){
	s = $scope
  //Seting config user after start app
	let configUser = LocalStorage.get('configUser');
	//End Seting config user
  if(configUser){
    $translate.use(configUser.language)
    s.geogig = geogig()
    s.geogigServe = s.geogig.serve.connect({uri: 'http://localhost:8182'})
  }else{
    $location.path('/main/config_user')
  }
}

function config ($translate, $location, toaster){
  s.getConfig = () => LocalStorage.get('configUser');

	s.saveConfig = (config) => {
		$translate.use(config.language);
		LocalStorage.set('configUser', config);
    s.geogig.config({user: config.username, email: config.email}).config
		toaster.success({ body:"Configuration saved successfully."})
		$location.path('/main/local');
	}
}

angular
.module('geogig-desktop')
.controller('initConfigCtrl', initConfigCtrl)
.controller('config', config)
