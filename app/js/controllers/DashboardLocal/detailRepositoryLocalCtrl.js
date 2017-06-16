function detailRepositoryLocalCtrl($location){
	console.info(s.Repository());

	s.NewShp = localShp => {
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
						s.Repository().shpfile.push({'name':ShpName,'shpfile':s.localShp})
						resolve(Geogig.importShapefile.call(s.Repository()))
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

	s.NewCommit = () => {
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
						resolve(Commit.new.call(s.Repository(), comment));
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

	s.analyze = () => {			
		ping.checkServerisOnAndKillProcess().then(q => {
			Geogig.analyze.call(s.Repository()).then(q => {
				swal({type:'success',title:'',html:`log:<h5>${q}</h5>`})
			})
		}).catch(q => console.log(q));	
	};
	s.add = () => {
		ping.checkServerisOnAndKillProcess().then(q => {
			Geogig.add.call(s.Repository()).then(q => {
				swal({type:'success',title:'',html:`log:<h5>${q[0]}</h5>`})
			})
		}).catch(q => console.log(q))		
	};
	s.push = () => {
		Geogig.push.call(s.Repository()).then(e => {
			swal({type:'success',title:'',html:`log:<h5>${e}</h5>`})
		})			
	};
	s.pull = () => {
		Geogig.pull.call(s.Repository()).then(e => {
				swal({type:'success',title:'',html:`log:<h5>${e}</h5>`})
		}).catch(e => console.log(e));
	};

	s.publicarRepo = function (id){
		/*repo.initRemote(s.currentRepoData().nome, (data,url)=>{
			if (data.response.error){
				console.log("ERROR");
			}else{
				console.log("publicado com sucesso");
				const tmp = s.mydb;
				tmp.infoRepositorios.local[id].remote = url;
				tmp.infoRepositorios.local[id].origin.de = 'remote'
				db.set(tmp);
				repo.copy_to_folder(s.currentRepoData().nome);

			}
		});*/
	}
	s.baixar_shp = function (key, repository){
		const {dialog} = require('electron').remote;
		dialog.showOpenDialog({
	  		properties: [ 'openFile', 'openDirectory'] }, function (filename) {
	  			let currentRepository = s.Repository();
	    		let newLocal = `${filename.toString()}\\${repository.name}.shp`;
	    		currentRepository.shpfile[key].shpfile = newLocal;
	    		db.updateshpFile.call(currentRepository)
	    		ping.checkServerisOnAndKillProcess().then(q => {
					s.Repository().exportShapefile(newLocal, repository.name).then(e => 
	    				swal({type:'success',title:'',html:`log:<h5>${e}</h5>`})
	    			)
				}).catch(q => console.log(q))	
	  		}
		);
	}
	s.dialog = function(){
		if (s.Repository().shpfile.length >= 1){
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
				fileName === undefined ? false : s.NewShp(fileName[0]), s.localShp = fileName[0];
			})
		}
	};
	
	
}
angular
.module('geogig-desktop')
.controller('detailRepositoryLocalCtrl', detailRepositoryLocalCtrl)
	