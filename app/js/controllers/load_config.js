function initial_config($scope, $location){
	$s = $scope;
	$s.mydb = mydb;
	if (db.openItem('SERVER')==true){
		console.info('Local Server Already Started')
	}else{
		db.setItem('SERVER',true);
		Repository.initServer((a,b,c)=>console.log(a,b,c));

	}
	$s.selectRepo = (selectedFild)=> {
		db.setItem('repoLocalAtivo',selectedFild)
		return $location.path('/repo/view')
	}
	$s.selectServeRemote = (selectedFild)=>{
		db.setItem('serveRemoteAtivo',selectedFild);
		$location.path('/repo/view_remoto');
	};
	$s.currentRepoId = ()=> db.openItem('repoLocalAtivo');
	$s.currentServeRemoteId = ()=> db.openItem('serveRemoteAtivo');
	$s.lastRepoId = ()=> $s.mydb.infoRepositorios.local.length - 1;
	$s.currentRepoData = ()=>$s.mydb.infoRepositorios.local[$s.currentRepoId()];
	$s.currentRepoRemoteData = ()=>$scope.mydb.infoRepositorios.remoto[$scope.currentServeRemoteId()];
}


function repo_view($scope, alert){
	function NewRepoCrl (inputValue){
		if (inputValue === false) return false;
		if (inputValue === "") {
			swal.showInputError("the field is empty!");
			return false
		}else{
			new Local(inputValue, 'remote', 'http://localhost:8182/repos/imovel').new();
			new Repository(inputValue,'local', 'http://localhost:8182/repos/imovel')
			.init(stdout=>swal("Success", stdout +" created.", "success"))
		}
	}
	$s.NewRepo = function(){
		alert.open(
			"New Repository",
			"Name:",
			"input",
			"...",
			NewRepoCrl)
	};
	arrayCheked = []

	$s.checkbox = function(key){
		arrayCheked.indexOf(key);
		if (index > -1){
			arrayCheked.splice(index, 1);
		}else{
			arrayCheked.push(key);
		}
	};

	$s.deleteRepo = function(){
		console.log("PARA DELETAR: ",arrayCheked );
	}

}
angular
.module('geogig-desktop')
.controller('initial_config', initial_config)
.controller('repo_view', repo_view)
