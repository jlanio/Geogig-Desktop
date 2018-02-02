function detailRepositoryLocalCtrl($location){

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

	let checkTaskIDStatus = async (taskID, taskIDFinished) => {
		let data = await checkTaskAdress(taskID)
		if (data.task.status === 'RUNNING') {
			swal({title:data.task.status})
			setTimeout(() => checkTaskIDStatus(taskID, taskIDFinished), 2000);
		}else if (data.task.status === 'FAILED'){
			swal({title:data.task.status})
		}else{
			taskIDFinished(taskID)//case FINISHED
		}
	}

	let gpkg_import = function (name, dir, transactionId) {
		s.currentRepo.then(e =>
 			e.geopackage.import(
				{
					format: 'gpkg',
	     		fileUpload: `${dir}`,
	     		transactionId: `${transactionId}`
				},
				{
					interchange: openGPKG(dir, 'geogig_audited_tables'),
	     		message: `${name}`,
					layer: 'ACRE'
				}
			).then(taskID => { checkTaskIDStatus(taskID.task.id, (e) => {
				console.log(e);
				swal({title:'AAAAAAAAA',html:' BBBBBBBBB'})
			})})
		)
	}

	s.NewCommit = () => {
		swal({
  title: 'Send commit text',
	input: 'text',
  showCancelButton: true,
  confirmButtonText: 'Submit',
  showLoaderOnConfirm: true,
  preConfirm: (commitText) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (commitText === '') {
          swal.showValidationError('Plase send commit text')
        }
        resolve()
      }, 2000)
    })
  },
  allowOutsideClick: () => !swal.isLoading()
}).then((commitText) => {
  if (commitText) {
		addGPKG().then(currentGPKG => {
			gpkg_import(commitText , currentGPKG, s.currentTransactionId)
		}).catch(e => {
			swal({title:'ERROR',html:' Caminho vazio'})
		})
    // swal({type: 'success',title: 'Ajax request finished!',html: 'Submitted email: ' + result})
  }
})


	}

	s.endTransaction = () => {
		s.currentRepo.then(repo => {
			repo.endTransaction({transactionId: s.currentTransactionId})
			.then(log => console.log(log))
		})
	};

	let commit = (comment) => {
		s.currentRepo.then(repo => {
			repo.commit({transactionId: s.currentTransactionId},{message: 'wwww', all: true})
			.then(log => console.log(log))
		})
	}

	s.gpkg_download = () => {
		s.currentRepo.then(repo => {
			repo.geopackage.export({format: 'gpkg'},{interchange: true})
			.then(taskID => {
				checkTaskIDStatus(taskID.task.id, (taskID) => baixar_shp(taskID))
			})
		})

		// swal({
		// 	title: 'New Shapefile',
		// 	input: 'text',
		// 	showCancelButton: true,
		// 	confirmButtonText: 'Submit',
		// 	showLoaderOnConfirm: true,
		// 	preConfirm:  layerName => {
		// 		return new Promise((resolve, reject) => {
		// 			if (!layerName) {
		// 				reject('the field is empty!')
		// 			} else {
		// 				resolve()
		// 			}
		// 		})
		// 	},
		// 	allowOutsideClick: false
		// }).then(q => {
		// 		swal({title:'Importando geopackage',html:`log:<h5>${q}</h5>`})
		// })
    //
		// // s.currentRepo.then(repo => {
		// // 		repo.add({transactionId: s.currentTransactionId }).then(e => {console.log(e)})
		// // })
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



	let baixar_shp = function (taskID){
		dialog.showOpenDialog({
	  		properties: [ 'openFile', 'openDirectory'] }, function (filename) {
					downloadGKPG(`http://localhost:8182/tasks/${taskID}/download`, filename+'\\dane.gpkg')
	  		}
		);
	}
	let addGPKG = () =>
		new Promise((resolve, reject) => {
			dialog.showOpenDialog({
				defaultPath: 'c:/',
				filters: [{name:'All Files', extensions:['*']},{name:'geopackage', extensions:['gpkg']}],
				properties: ['openFile']
				},
				function (fileName) {
					if(fileName === undefined){
						reject()
					}else{
						resolve(fileName[0])
					}
			})
		})
}
angular
.module('geogig-desktop')
.controller('detailRepositoryLocalCtrl', detailRepositoryLocalCtrl)
