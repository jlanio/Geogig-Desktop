function repositorio($scope, $location, SweetAlert, db, repo, toaster, alert ){
	
	function NewCommitCtrl(inputValue){
		if (inputValue === false) return false;

		if (inputValue === "") {
			swal.showInputError("the field is empty!");
			return false
		}else{
			repo.commit($scope.currentRepoData().nome, $scope.type, inputValue,function(data){
				swal("", data +" ", "success");
			});
		}
	};
	function NewShpCtrl (inputValue){
		if (inputValue === false) return false;

		if (inputValue === "") {
			swal.showInputError("the field is empty!");
			return false
		}else{
			const tmp  = $scope.mydb;
			tmp.infoRepositorios.local[db.OpenItem('repoLocalAtivo')].arquivos.push({'nome':inputValue,'localDir':$scope.localShp});
			db.set(tmp);
			$scope.mydb = $scope.mydb;
			repo.shpImport($scope.currentRepoData().nome,'local', $scope.localShp, function(data){
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
	$scope.NewShp = function(localShp){
		alert.open(
			"New Shapefile",
			"Now add a name:",
			"input",
			"...",
			NewShpCtrl)
	};


	$scope.add = function (type){
		repo.add($scope.currentRepoData().nome, type, function(code, stdout, stderr){
			swal("", stdout +" ");
		});
	};
	$scope.analisar = function(type){
		var shapefile = $scope.currentRepoData().arquivos;
		for (cada in shapefile){
			repo.shpImport(
				$scope.currentRepoData().nome,
				type,
				$scope.currentRepoData().arquivos[cada].localDir,
				function(code, stdout, stderr){
					console.log("code:"+code, "strdout: "+stdout, "stderr: "+stderr);
					swal("", code +"");
				}
				)
			console.log($scope.currentRepoData().arquivos[cada].localDir);
		}
	}
		$scope.publicarRepo = function (id){
		repo.initRemote($scope.currentRepoData().nome, (data,url)=>{
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
		});
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
