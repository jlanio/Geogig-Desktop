/**
 * toastrCtrl - Function for toastr
 */
function toastrCtrl($scope, toaster){

    $scope.demo1 = function(){
        toaster.success({ body:"Hi, welcome to Inspinia. This is example of Toastr notification box."});
    };

    $scope.demo2 = function(){
        toaster.warning({ title: "Title example", body:"This is example of Toastr notification box."});
    };

    $scope.demo3 = function(){
        toaster.pop({
            type: 'info',
            title: 'Title example',
            body: 'This is example of Toastr notification box.',
            showCloseButton: true

        });
    };

    $scope.demo4 = function(){
        toaster.pop({
            type: 'error',
            title: 'Title example',
            body: 'This is example of Toastr notification box.',
            showCloseButton: true,
            timeout: 1000
        });
    };

}

/**
 * modalDemoCtrl - Controller used to run modal view
 * used in Basic form view
 */
function modalDemoCtrl($scope, $uibModal) {

    $scope.open3 = function (size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal.html',
            size: size,
            controller: ModalInstanceCtrl,
            windowClass: "animated flipInY"
        });
    };
};

function ModalInstanceCtrl ($scope, $http, $uibModalInstance, toaster) {
    $scope.send = function (remote) {
        $uibModalInstance.close();
        if (remote.origin === 'local_network'){
            url = "http://"+remote.url+"/8182/repos.json";
        }else if (remote.origin === 'geoserver'){
            url = remote.url+"geoserver/geogig/repos.json";
        }else if (remote.origin === 'postgresql'){
            console.log("postgresql");
        }else {
            console.log('type is not defined');
        }
        $http.get(url).success(function(data){
            Geogig.ConnectRemote(remote, data);
            toaster.success(remote.titulo + ' added successfully!', 'We found '+ data.repos.repo.length +' repositories')
        }).error(function(){
            toaster.pop({
                type: 'error',
                title: 'Deu ruim!',
                body: 'Server not found or address is not valid.',
                showCloseButton: true
            });
        });
    };

    $scope.cancel = () => $uibModalInstance.dismiss('cancel');
};


angular
    .module('geogig-desktop')
    .controller('toastrCtrl',toastrCtrl)
    .controller('modalDemoCtrl',modalDemoCtrl)

