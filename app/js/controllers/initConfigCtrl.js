function initConfigCtrl($scope, $state, $translate){
	s = $scope;
	console.log();
}
function config ($translate, $state, toaster){
	s.saveConfig = (config) => {
		console.log(config)
		$translate.use(config.language);
		toaster.success({ body:"Configuration saved successfully."});
        Utils.geogig(['config', '--global','user.name', config.username]).then(
            Utils.geogig(['config', '--global','user.email', config.email])
        ).catch(()=> 'error')
		$state.go('main.local');
	}
	s.getConfig = () => {};
}

angular
.module('geogig-desktop')
.controller('initConfigCtrl', initConfigCtrl)
.controller('config', config)
