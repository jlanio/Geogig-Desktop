/**
 * sweetAlertCtrl - Function for Sweet alerts
 */
function sweetAlertCtrl($scope, SweetAlert) {


    $scope.demo1 = function () {
        SweetAlert.swal({
              title: "Novo repositorio",
              text: "OK! Agora adicione o nome:",
              type: "input",
              showCancelButton: true,
              closeOnConfirm: false,
              animation: "slide-from-top",
              inputPlaceholder: "Entre aqui com o nome"
            },
            function(inputValue){
              if (inputValue === false) return false;

              if (inputValue === "") {
                swal.showInputError("Calma aê, o campo esta vazio!");
                return false
              }

              swal("Muito bem!", inputValue +" criado.", "success");
              db.set("{'name':'teste'}");
            });
    }

    $scope.demo2 = function () {
        SweetAlert.swal({
            title: "Good job!",
            text: "You clicked the button!",
            type: "success"
        });
    }

    $scope.demo3 = function () {
        SweetAlert.swal({
                title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function () {
                swal("Deleted!", "Your imaginary file has been deleted.", "success");
            });
    }

    $scope.demo4 = function () {
        SweetAlert.swal({
                title: "Are you sure?",
                text: "Your will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Deleted!", "Your imaginary file has been deleted.", "success");
                } else {
                    SweetAlert.swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });
    }

}
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

    $scope.open = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal_example.html',
            controller: ModalInstanceCtrl
        });
    };

    $scope.open1 = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal_example1.html',
            controller: ModalInstanceCtrl
        });
    };

    $scope.open2 = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal_example2.html',
            controller: ModalInstanceCtrl,
            windowClass: "animated fadeIn"
        });
    };

    $scope.open3 = function (size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal.html',
            size: size,
            controller: ModalInstanceCtrl,
            windowClass: "animated flipInY"
        });
    };

    $scope.open4 = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal_example2.html',
            controller: ModalInstanceCtrl,
            windowClass: "animated flipInY"
        });
    };
};

function ModalInstanceCtrl ($scope, $uibModalInstance) {

    $scope.ok = function () {
        $uibModalInstance.close();
        console.log("modal_OK");
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        console.log("modal_cancel");
    };

};


angular
    .module('geogig-desktop')
    .controller('sweetAlertCtrl',sweetAlertCtrl)
    .controller('toastrCtrl',toastrCtrl)
    .controller('modalDemoCtrl',modalDemoCtrl)
