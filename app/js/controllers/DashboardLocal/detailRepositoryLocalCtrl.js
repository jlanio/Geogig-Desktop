function detailRepositoryLocalCtrl($location, toaster){

	s.currentRepo
		.then(repo => {
			s.$apply(() => s.currentUri = repo._api._params)
			repo.lsTree().then(e => {
				s.$apply(() => s.currentlsTree = e.node)
			});
			repo.beginTransaction().then(e => {
				console.log(e.Transaction.ID);
				s.currentTransactionId = e.Transaction.ID
			})
	})

	let checkTaskAdress =  (taskID) => s.geogigServe.tasks.findOne(taskID);

	let checkTaskIDStatus = async (taskID) => {
		let data = await checkTaskAdress(taskID)
		if (data.task.status === 'RUNNING') {
			toaster.success({ body:data.task.status});
			console.log(data);
			setTimeout(() => checkTaskIDStatus(taskID), 2000);
		}else{
			toaster.success({ body:data.task.status});
			console.log(data);
		}
	}

	let cuidaTrasacao = function (name, dir, transactionId) {
		return s.currentRepo.then(e =>
 			e.geopackage.import({
				format: 'gpkg',
     		fileUpload: `${dir}`,
     		transactionId: `${transactionId}`,
     		interchange: true,
     		message: name
   		}).then(taskID => checkTaskIDStatus(taskID.task.id))
		)
	}

	s.NewShp = localShp => {
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

						// s.Repository().shpfile.push({'name':ShpName,'shpfile':s.localShp})
						resolve(cuidaTrasacao(ShpName,s.localShp, s.currentTransactionId))
					}
				})
			},
			allowOutsideClick: false
		}).then(q => {
			console.log(s.currentTransactionId);
				swal({title:'Importando geopackage',html:`log:<h5>${q[0]}</h5>`})
		})
	}

	s.NewCommit = () => {
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
						resolve(s.currentRepo.then(e => e.endTransaction({transactionId: s.currentTransactionId},{cancel: false})));
					}
				})
			},
			allowOutsideClick: false
		}).then(q => {
			if(q.response.success.true){
				swal({type:'success',title:'Repository success!',html:`log:success`})
			}else{
				swal({type: 'error',title:`log: error`});
			}

		}).catch(q => {swal({type: 'error',title:`log: <h5> ${q}</h5>`});})
	}

	s.analyze = () => {
		toaster.pop({
				type: 'error',
				title: 'Title example',
				body: 'This is example of Toastr notification box.',
				showCloseButton: true,
				timeout: 1000
		});
	};
	s.add = () => {

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
			const {dialog} = require('electron').remote;
			dialog.showOpenDialog(
			{
				defaultPath: 'c:/',
				filters: [
				{ name: 'All Files', extensions: ['*'] },
				{ name: 'geopackage', extensions: ['gpkg'] }
				],
				properties: ['openFile']
			},
			fileName => {
				fileName === undefined ? false : s.NewShp(fileName[0]), s.localShp = fileName[0];
			})
		}



}
angular
.module('geogig-desktop')
.controller('detailRepositoryLocalCtrl', detailRepositoryLocalCtrl)
