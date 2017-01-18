function repositorio($scope,$location,db,SweetAlert,repo,toaster,alert){
	/*INIT*/
	$scope.mydb = db.open();	

	$scope.selectRepo = function(selectedFild){
		db.SetItem('repoLocalAtivo',selectedFild);
		return $location.path('/repo/view');
	};
	$scope.currentRepoId = function(){
		return db.OpenItem('repoLocalAtivo'); 
	};
	$scope.currentRepoData = function() {
		return $scope.mydb.infoRepositorios.local[$scope.currentRepoId()]; 
	};
	/*INI END*/
	function NewRepoCrl (inputValue){
		if (inputValue === false) return false;
		if (inputValue === "") {
			swal.showInputError("Calma aê, o campo esta vazio!");
			return false
		}else{
			const tmp  = db.open();
			tmp.infoRepositorios.local.push(
			{
				"nome":inputValue,
				"arquivos":[],
				"descricao":"",
				"origin":"local",
				"remote":""
			});
			db.set(tmp);
			$scope.mydb = db.open();
			repo.init(inputValue, function  (code, stdout, stderr){
				swal("Muito bem!", stdout +" criado.", "success");
			});
		}
	}
	function NewCommitCtrl(inputValue){
		if (inputValue === false) return false;

		if (inputValue === "") {
			swal.showInputError("Vai com calma, o campo esta vazio!");
			return false
		}else{     
			repo.commit($scope.currentRepoData().nome, inputValue,function(data){
				swal("", data +" ", "success"); 
			});
		}
	};
	function NewShpCtrl (inputValue){
		if (inputValue === false) return false;

		if (inputValue === "") {
			swal.showInputError("Vai com calma, o campo esta vazio!");
			return false
		}else{
			const tmp  = db.open();
			tmp.infoRepositorios.local[db.OpenItem('repoLocalAtivo')].arquivos.push({'nome':inputValue,'localDir':$scope.localShp});
			db.set(tmp);
			$scope.mydb = db.open();
			repo.shpImport($scope.currentRepoData().nome,$scope.localShp, function(data){
				swal("Shapefile", inputValue +" importado com sucesso", "success");     
			}); 
		}
	};
	$scope.NewRepo = function(){
		alert.open(
			"Novo Repositório",
			"Dê o nome:",
			"input",
			"...",
			NewRepoCrl)
	};

	$scope.NewCommit = function(){
		alert.open(
			"Novo Commit",
			"Blz! Agora adicione um comentario:",
			"input",
			"...",
			NewCommitCtrl
			)
	};

	$scope.NewShp = function(localShp){
		alert.open(
			"Novo Shapefile",
			"Blz! Agora adicione o nome:",
			"input",
			"...",
			NewShpCtrl)
	};

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

	$scope.add = function (){
		repo.add($scope.currentRepoData().nome, function(code, stdout, stderr){
			swal("", stdout +" ");
		});
	};
	$scope.analisar = function(){
		var shapefile = $scope.currentRepoData().arquivos;
		for (cada in shapefile){
			repo.shpImport(
				$scope.currentRepoData().nome,
				$scope.currentRepoData().arquivos[cada].localDir,
				function(code, stdout, stderr){
					console.log("code:"+code, "strdout: "+stdout, "stderr: "+stderr);
					swal("", code +"");
				}
				)
			console.log($scope.currentRepoData().arquivos[cada].localDir);
		}
	}

	$scope.arrayCheked = [];
	$scope.checkbox = function(key){
		var index = $scope.arrayCheked.indexOf(key);
		if (index > -1){
			$scope.arrayCheked.splice(index, 1);
		}else{
			$scope.arrayCheked.push(key);
		}
	};

	$scope.deleteRepo = function(){
		console.log("PARA DELETAR: ",$scope.arrayCheked );
	}
	$scope.publicarRepo = function (){

	}



}
angular
.module('gitgeo')
.controller('repositorio', repositorio)