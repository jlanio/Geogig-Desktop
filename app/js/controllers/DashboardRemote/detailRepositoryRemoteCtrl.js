function detailRepositoryRemoteCtrl($uibModal, toaster, $http){

  let load = new Promise ((resolve, reject) => {
    $http.get(s.currentRemoteKey.url).then(e => resolve(e.data))
  })
  load.then(remote => {
    s.$apply(() =>  s.remote = remote)
  })

  s.clone = (name, repoAddress) => {
    let rebuildRepoAddress = repoAddress.replace('.json', '')

    s.geogig.repo({uri: rebuildRepoAddress, name: name + '_remote'})
    .clone.then(e => {
      swal({
				type: 'success',
				title: `Repository  success!`,
				html: `log: <h5> ${e}</h5>`
			})
  	})
	}


}
angular
.module('geogig-desktop')
.controller('detailRepositoryRemoteCtrl', detailRepositoryRemoteCtrl)
