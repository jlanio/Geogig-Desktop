function repositorio($scope, $location, db, SweetAlert, repo, toaster, alert ){
	/*INIT*/	
	$scope.mydb = mydb;
	console.table($scope.mydb.infoRepositorios.local);
	
	if (db.OpenItem('SERVER')=='true'){
		console.info('Servidor Local ja Iniciado')
	}else{
		db.SetItem('SERVER','true');
		repo.initLocal();
	}
	$scope.saveConfig = function(config){
		db.SetItem('user_name', config.username);
		db.SetItem('email', config.email);
		repo.config(db.OpenItem('user_name'),db.OpenItem('email'));
	}
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
			const tmp  = $scope.mydb;
			tmp.infoRepositorios.local.push(
			{
				"nome":inputValue,
				"arquivos":[],
				"descricao":"",
				"origin":"local",
				"remote":""
			});
			db.set(tmp);
			repo.init(inputValue, 'local',function  (code, stdout, stderr){
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
			repo.commit($scope.currentRepoData().nome, $scope.type, inputValue,function(data){
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
			const tmp  = $scope.mydb;
			tmp.infoRepositorios.local[db.OpenItem('repoLocalAtivo')].arquivos.push({'nome':inputValue,'localDir':$scope.localShp});
			db.set(tmp);
			$scope.mydb = $scope.mydb;
			repo.shpImport($scope.currentRepoData().nome,'local', $scope.localShp, function(data){
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

	$scope.NewCommit = function(type){
		$scope.type = type
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
	$scope.publicarRepo = function (id){
		repo.initRemote($scope.currentRepoData().nome, (data,url)=>{
			if (data.response.error){
				console.log("ERROR");
			}else{
				console.log("publicado com sucesso");
				const tmp = $scope.mydb;
				tmp.infoRepositorios.local[id].remote = url;
				db.set(tmp);

			}
		});
	}


}
angular
.module('gitgeo')
.controller('repositorio', repositorio)