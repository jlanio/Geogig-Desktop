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
			swal({title:data.task.status})
			setTimeout(() => checkTaskIDStatus(taskID), 2000);
		}else{
			swal({title:data.task.status})
		}
	}

	let cuidaTrasacao = function (name, dir, transactionId) {
		s.currentRepo.then(e =>
 			e.geopackage.import(
				{
					format: 'gpkg',
	     		fileUpload: `${dir}`,
	     		transactionId: `${transactionId}`
				},
				{
					interchange: true,
	     		message: `${name}`,
					layer: 'omelete'
				}
			).then(taskID => { checkTaskIDStatus(taskID.task.id)})
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
						resolve(cuidaTrasacao(ShpName, s.localShp, s.currentTransactionId))
					}
				})
			},
			allowOutsideClick: false
		}).then(q => {
				swal({title:'Importando geopackage',html:`log:<h5>${q}</h5>`})
		})
	}

	s.NewCommit = () => {
		commit('comment11111111111')
	}

	s.endTransaction = () => {
		s.currentRepo.then(repo => {
			repo.endTransaction({transactionId: s.currentTransactionId},{cancel: false})
		})
	};
	let commit = (comment) => {
		s.currentRepo.then(repo => {
			repo.commit({transactionId: s.currentTransactionId},{message: 'wwww', all: true})
			.then(log => console.log(log))
		})
	}
	s.add = () => {
		s.currentRepo.then(repo => {
				repo.add({transactionId: s.currentTransactionId }).then(e => {console.log(e)})
		})
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
