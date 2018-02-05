function detailRepositoryRemoteCtrl($uibModal, toaster, $http){

  let load = new Promise (function(resolve, reject){
    storage.get(s.currentRemoteKey, (error, data) => resolve(data))
  })
  load.then(remote => {
    s.$apply(() =>  s.remote = remote)
  })

  s.clone = (name, repoAddress) => {
    let rebuildRepoAddress = repoAddress.replace('.json', '')
    s.geogig.repo({uri: rebuildRepoAddress, name: name+'_remote'})
    .clone.then(e => {
      console.log(e);
      swal({
				type: 'success',
				title: `Repository  success!`,
				html: `log: <h5> ${e}</h5>`
			})

      // setTimeout(() => {
      //   s.geogigServe.repos.findOne({name: name+'_remote'})
      //     .then(e => {
      //   		e.remote({remoteURL: repoAddress, remoteName: 'origin'})
      //   			.then(d =>{
      //
      //   				console.log(d);
      //   			})
      //   	})
      // }, 4000);
  	})
	}


}
angular
.module('geogig-desktop')
.controller('detailRepositoryRemoteCtrl', detailRepositoryRemoteCtrl)
