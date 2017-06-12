function detailRepositoryRemoteCtrl($uibModal, toaster, $http){
   
    $s.clone = (name, repoAddress) => {
		Geogig.clone.call(new Repository(name, undefined, repoAddress, undefined, 'remote')).then(e => {
			console.log(e)
			/*swal({
				type: 'success',
				title: `Repository  success!`,
				html: `log: <h5> ${e[0]}</h5>`
			})*/
		})
	}
	

}
angular
.module('geogig-desktop')
.controller('detailRepositoryRemoteCtrl', detailRepositoryRemoteCtrl)


