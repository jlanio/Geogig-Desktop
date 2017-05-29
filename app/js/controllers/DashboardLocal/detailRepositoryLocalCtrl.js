function detailRepositoryLocalCtrl($scope, $location){
	console.log($s.Repository());
	$s.NewShp = localShp => {
		//Necessary method due to issue ->github.com/locationtech/geogig/issues/309
		ping.checkServerisOnAndKillProcess();
		swal({
			title: 'New Shapefile',
			input: 'text',
			showCancelButton: true,
			confirmButtonText: 'Submit',
			showLoaderOnConfirm: true,
			preConfirm:  ShpName => {
				return new Promise((resolve, reject) => {
					if (!ShpName) {
						reject('the field is empty!')
					} else {
						$s.Repository().shpfile.push({'name':ShpName,'shpfile':$s.localShp})
						resolve(Geogig.importShapefile.call($s.Repository()))
					}
				})
			},
			allowOutsideClick: false
		}).then(q => {
			if(q[0].match(/Exception /)){
				swal({type: 'error',title:`log: <h5> ${q}</h5>`});
			}else{
				swal({type:'success',title:'Repository success!',html:`log:<h5>${q[0]}</h5>`})
			}
			
		})
	}

	$s.NewCommit = () => {
		//Necessary method due to issue ->github.com/locationtech/geogig/issues/309
		ping.checkServerisOnAndKillProcess();
		swal({
			title: 'New Commit',
			input: 'text',
			showCancelButton: true,
			confirmButtonText: 'Submit',
			showLoaderOnConfirm: true,
			preConfirm:  comment => {
				return new Promise((resolve, reject) => {
					if (!comment) {
						reject('the field is empty!')
					} else {
						resolve(Commit.new.call($s.Repository(), comment));
					}
				})
			},
			allowOutsideClick: false
		}).then(q => {
			if(q.match(/Nothing to commit after /)){
				swal({type: 'error',title:`log: <h5> ${q}</h5>`});
			}else{
				swal({type:'success',title:'Repository success!',html:`log:<h5>${q}</h5>`})
			}
			
		}).catch(q => {swal({type: 'error',title:`log: <h5> ${q}</h5>`});})
	}

	$s.analyze = () => {
		Geogig.analyze.call($s.Repository())
			.then(q => swal({type:'success',title:'',html:`log:<h5>${q}</h5>`}));	
	};
	$s.add = () => {
		//Necessary method due to issue ->github.com/locationtech/geogig/issues/309
		/*ping.checkServerisOnAndKillProcess();*/
		Geogig.add.call($s.Repository())
			.then(q => swal({type:'success',title:'',html:`log:<h5>${q[0]}</h5>`}))

		
	};
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
	$s.push = function(type){
		repo.push($s.currentRepoData().nome, type, function(error, stdout, stderr){
			console.log("OK");
			toaster.pop({
				type: 'error',
				title: 'Deu ruim!',
				body: "Push",
				showCloseButton: true
			});
		})
	}
	$s.pull = function(type){
		repo.pull($s.currentRepoData().nome, type,(error, stdout, stderr)=>{
			toaster.pop({
				type: 'error',
				title: 'Deu ruim!',
				body: "pull" ,
				showCloseButton: true
			});
		})
	}
	function shp_export(_Name, type, objeto, localSave){
		repo.shp_export(_Name, type, objeto, localSave, function(error, stdout, stderr){
			console.log(error, stdout, stderr);
		})
	}
	$s.baixar_shp = function (_Name, objeto, key){
		const {dialog} = require('electron').remote;
		dialog.showOpenDialog({
	  		properties: [ 'openFile', 'openDirectory'] }, function (filename) {
	    		var localSave = filename.toString();
	    		shp_export(_Name, 'remoto',objeto, localSave)
	    		const tmp = $s.mydb;
	    		tmp.infoRepositorios.local[$s.currentRepoId()].arquivos[key].localDir = localSave+'\\'+objeto.nome+'.shp';
	    		db.set(tmp);
	  		}
		);
	}
	$s.dialog = function(){
		if ($s.Repository().shpfile.length >= 1){
			swal({type: 'error',title:`<h5>Sorry, we currently only support one shp per repository.
				<br>In the next version will be added support for multiple shapefiles per repository..</h5>`});
		}else{
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
		}
	};
	
	
}
angular
.module('geogig-desktop')
.controller('detailRepositoryLocalCtrl', detailRepositoryLocalCtrl)
	