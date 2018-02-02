function detailRepositoryRemoteCtrl($uibModal, toaster, $http){

    s.clone = (name, repoAddress) => {
      s.geogig.repo({uri: repoAddress, name: name+'.remote'})
      .clone.then(e => {
        swal({
  				type: 'success',
  				title: `Repository  success!`,
  				html: `log: <h5> ${e}</h5>`
  			})

        setTimeout(() => {
          s.geogigServe.repos.findOne({name: name+'.remote'})
            .then(e => {
          		e.remote({remoteURL: repoAddress, remoteName: 'origin'})
          			.then(d =>{

          				console.log(d);
          			})
          	})
        }, 4000);





    	})
	}


}
angular
.module('geogig-desktop')
.controller('detailRepositoryRemoteCtrl', detailRepositoryRemoteCtrl)
