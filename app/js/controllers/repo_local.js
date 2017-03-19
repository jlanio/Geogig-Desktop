function repositorio($scope, $location, repo, alert ){
	console.log($scope.currentRepoData().name);
	var rp = new Repository(
		$scope.currentRepoData().name,
		$scope.currentRepoData().origin,
		$scope.currentRepoData().serverAddress
		)
	var rpObj = new Local(
		$scope.currentRepoData().name,
		$scope.currentRepoData().origin,
		$scope.currentRepoData().serverAddress,
		$scope.mydb,
		$scope.currentRepoData().shpfile
		)

	$scope.NewShp = function(localShp){
		alert.open(
			"New Shapefile",
			"Now add a name:",
			"input",
			"...",
			NewShpCtrl)
	};
	function NewShpCtrl (inputValue){
		if (inputValue === false) return false;

		if (inputValue === "") {
			swal.showInputError("the field is empty!");
			return false
		}else{
			rpObj.shpFile($scope.currentRepoId(), inputValue, $scope.localShp);
			rp.importShapefile($scope.localShp, function(data){
				swal("Shapefile", inputValue +" Importing successfully", "success");
			});
		}
	};
	$scope.NewCommit = function(type){
		$scope.type = type
		alert.open(
			"New Commit",
			"Now add a comment:",
			"input",
			"...",
			NewCommitCtrl
			)
	};
	function NewCommitCtrl(inputValue){
		if (inputValue === false) return false;

		if (inputValue === "") {
			swal.showInputError("the field is empty!");
			return false
		}else{
			new Commit (rp,'ola_mundo').commit(data=>swal("", data +" ", "success"))
		}
	};
	$scope.add = function (type){
		rp.add(stdout => swal(" ", stdout +" add successfully", "success"));
	};
	$scope.analisar = function(type){
		for (each in rpObj.shpfile){
			rp.importShapefile(rpObj.shpfile[each].localDir,
				(data)=>swal("Shapefile", data +" Importing successfully", "success")
			);
			
		}
	}
	$scope.publicarRepo = function (id){
	/*repo.initRemote($scope.currentRepoData().nome, (data,url)=>{
		if (data.response.error){
			console.log("ERROR");
		}else{
			console.log("publicado com sucesso");
			const tmp = $scope.mydb;
			tmp.infoRepositorios.local[id].remote = url;
			tmp.infoRepositorios.local[id].origin.de = 'remote'
			db.set(tmp);
			repo.copy_to_folder($scope.currentRepoData().nome);

		}
	});*/
	}
	$scope.dialog = function(){
		const {dialog} = require('electron').remote;
		dialog.showOpenDialog(
		{
			defaultPath: 'c:/',
			filters: [
			{ name: 'All Files', extensions: ['*'] },
			{ name: 'Shapefile', extensions: ['shp'] }
			],
			properties: ['openFile']
		},
		function (fileName) {
			if (fileName === undefined){
				return;
			}else{
				$scope.NewShp(fileName[0]);
				$scope.localShp = fileName[0];
			}
		})
	};
}
angular
.module('geogig-desktop')
.controller('repositorio', repositorio)
