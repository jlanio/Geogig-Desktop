function dashboardRemoteCtrl($uibModal, $http, toaster){

    s.newConnectionRemote = function (size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal.html',
            size: size,
            controller: ModalInstanceCtrl,
            windowClass: "animated flipInY"
        });
    };
    function get (serverAddress, id){
        $http.get(`${serverAddress}`).success(data => {
            Geogig.updateRemoteRepositories(id, data);
                toaster.pop({
                    type: 'success',
                    title: serverAddress,
                    body: `${data.repos.repo.length} existing repositories`,
                    showCloseButton: true
                });
        }).error(data=>{
            toaster.pop({
                type: 'error',
                title: 'Servidor Offline',
                body: serverAddress,
                showCloseButton: true
            });
        })
    }
    s.remoteUpdateRepos = () => {
        s.mydb.infoRepositorios.conectedIn.forEach((conexao, id) => get(conexao.serverAddress, id));
    }
    s.deleteConexaoRemote = (idFordelete) => {
        swal({
            title: 'Your conexao will be deleted, do you want to continue?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: true
        }).then(() => {
            db.removeConexaoRemote(idFordelete)
            swal('Deleted!', 'Your conexao has been deleted.','success')
        }, (dismiss) => {
        if (dismiss === 'cancel')
            swal('Cancelled','Your conexao is safe :)','error')
        })
    }
}
angular
.module('geogig-desktop')
.controller('dashboardRemoteCtrl', dashboardRemoteCtrl)
