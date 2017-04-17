function repositorio($scope, $location, alert ){
	let current = $s.currentRepoData();
	var rp = new Repository(current.name,current.origin,current.serverAddress)
	var rpObj = new RepositoryLocal(current.name, current.origin, current.serverAddress, current.shpfile)
	console.log(rp);
	console.log(rpObj);
	$s.NewShp = localShp=>alert.open("New Shapefile1","Now add a name:","input","...",NewShpCtrl);
	$s.NewCommit = type=>alert.open("New Commit","Now add a comment:","input","...",NewCommitCtrl);
	$s.add = (type)=>rp.add(stdout => swal(" ", stdout +" add successfully", "success"));
	$s.analisar = (type)=>{
		rpObj.ShpFile.forEach((index)=>{
				rp.importShapefile(rpObj.ShpFile[index].shpfile,
					(data)=>swal("Shapefile", data +" Importing successfully", "success")
				)	
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
			rpObj.newShpFile($s.currentRepoId(), inputValue, $s.localShp);
			rp.importShapefile($s.localShp, function(data){
				swal("Shapefile", inputValue +" Importing successfully", "success");
			});
		}
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
}
angular
.module('geogig-desktop')
.controller('repositorio', repositorio)
