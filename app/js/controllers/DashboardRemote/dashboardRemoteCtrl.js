function dashboardRemoteCtrl($uibModal, $http, toaster){

    $s.newConnectionRemote = function (size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal.html',
            size: size,
            controller: ModalInstanceCtrl,
            windowClass: "animated flipInY"
        });
    };
    function get (serverAddress, id){
        $http.get(`${serverAddress}repos.json`).success(data => {
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
    $s.remoteUpdateRepos = () => {
        $s.mydb.infoRepositorios.conectedIn.forEach((conexao, id) => get(conexao.serverAddress, id));
    }
}
angular
.module('geogig-desktop')
.controller('dashboardRemoteCtrl', dashboardRemoteCtrl)


