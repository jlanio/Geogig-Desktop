function repositorio($scope, $location, alert ){
	let current = $s.currentRepoData();
	console.log(current);
	let ctrl = new Ctrl(current.name, current.origin, current.serverAddress, current.shpfile);
		console.log(ctrl);
	$s.NewShp = localShp=>alert.open("New Shapefile1","Now add a name:","input","...",NewShpCtrl);
	$s.NewCommit = type=>alert.open("New Commit","Now add a comment:","input","...",NewCommitCtrl);
	$s.add = (type)=>ctrl.Repository.add().then(q=>swal(" ", q +" add successfully", "success"));
	$s.analisar = (type)=>{
		ctrl.RepositoryLocal.ShpFile.forEach((element, index, array)=>{
				console.log(element, index, array);
				ctrl.Repository.importShapefile(ctrl.RepositoryLocal.ShpFile[index].shpfile)
				.then(data=>swal("Shapefile", data +" Importing successfully", "success"));	
			}
		);
	}
	$s.publicarRepo = function (id){
	/*repo.initRemote($s.currentRepoData().nome, (data,url)=>{
		if (data.response.error){
			console.log("ERROR");
		}else{
			console.log("publicado com sucesso");
			const tmp = $s.mydb;
			tmp.infoRepositorios.local[id].remote = url;
			tmp.infoRepositorios.local[id].origin.de = 'remote'
			db.set(tmp);
			repo.copy_to_folder($s.currentRepoData().nome);

		}
	});*/
	}
	$s.dialog = function(){
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
		fileName => {
			fileName === undefined ? false : $s.NewShp(fileName[0]), $s.localShp = fileName[0];
		})
	};
	function NewShpCtrl (inputValue){
		if (inputValue === false) return false;

		if (inputValue === "") {
			swal.showInputError("the field is empty!");
			return false
		}else{
			ctrl.update($s.currentRepoId(), inputValue, $s.localShp);
			ctrl.Repository.importShapefile($s.localShp)
			.then(q=>swal("Shapefile", q +" Importing successfully", "success"));
		}
	};
	function NewCommitCtrl(inputValue){
		if (inputValue === false) return false;

		if (inputValue === "") {
			swal.showInputError("the field is empty!");
			return false
		}else{
			new Commit (ctrl.Repository,'ola_mundo').commit(data=>swal("", data +" ", "success"))
		}
	};
}
angular
.module('geogig-desktop')
.controller('repositorio', repositorio)
