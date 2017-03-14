function initial_config($scope, $location){

	$scope.mydb = mydb;

	if (db.openItem('SERVER')=='true'){
		console.info('Local Server Already Started')
	}else{
		db.setItem('SERVER','true');
		repo.initLocal();
	}
	$scope.selectRepo = function(selectedFild){
		db.setItem('repoLocalAtivo',selectedFild);
		return $location.path('/repo/view');
	};
	$scope.currentRepoId = function(){
		return db.openItem('repoLocalAtivo');
	};

	$scope.currentRepoData = function() {
		return $scope.mydb.infoRepositorios.local[$scope.currentRepoId()];
	};
	$scope.selectServeRemote = function(selectedFild){
		db.setItem('serveRemoteAtivo',selectedFild);
		$location.path('/repo/view_remoto');
	};
	$scope.currentServeRemoteId = function(){
		return db.openItem('serveRemoteAtivo');
	};
	$scope.currentRepoRemoteData = function(){
		return $scope.mydb.infoRepositorios.remoto[$scope.currentServeRemoteId()];
	};
/*	$scope.selectRepoRemote = function(selectedFild){
		db.setItem('repoRemoteAtivo',selectedFild);
		return $location.path('/repo/remoto_repo');
	};*/
}


function repo_view($scope, alert){
	function NewRepoCrl (inputValue){
		if (inputValue === false) return false;
		if (inputValue === "") {
			swal.showInputError("the field is empty!");
			return false
		}else{
			new Local(inputValue, [], 'local', inputValue, 'descricao', $scope.mydb ).save();
			new Repository(inputValue, [],'local', 'http://localhost:8182/repos/imovel')
			.init(function  (code, stdout, stderr){
				swal("Success", stdout +" created.", "success");
			})
		}
	}
	$scope.NewRepo = function(){
		alert.open(
			"New Repository",
			"Name:",
			"input",
			"...",
			NewRepoCrl)
	};
		arrayCheked = [];

	$scope.checkbox = function(key){
		var index = arrayCheked.indexOf(key);
		if (index > -1){
			arrayCheked.splice(index, 1);
		}else{
			arrayCheked.push(key);
		}
	};

	$scope.deleteRepo = function(){
		console.log("PARA DELETAR: ",arrayCheked );
	}

}
angular
.module('geogig-desktop')
.controller('initial_config', initial_config)
.controller('repo_view', repo_view)