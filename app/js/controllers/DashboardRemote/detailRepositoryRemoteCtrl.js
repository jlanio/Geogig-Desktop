function detailRepositoryRemoteCtrl($scope, $location, toaster, $uibModal){
	/*Get Commit*/
	
	$s.getCommit = () => {
		return Geogig.log.call($s.Repository()).then(q => q.response.commit).catch(q => q);
	}
	$s.compareCommit = (load) => {
		var commidId = [];
		load.forEach(element=>element.activate ? commidId.push(element.id) : false);
		
		new Commit($geogig.Repository, null, commidId[1], commidId[0])
		.diffCommit()
		.then(q => {
			LocalStorage.set("geojson", WKTtoGeojson.init(q));
			$location.path('/main/map');
		}).catch(q => console.log(q))
	}
    $s.open3 = function (size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal.html',
            size: size,
            controller: ModalInstanceCtrl,
            windowClass: "animated flipInY"
        });
    };
}
angular
.module('geogig-desktop')
.controller('detailRepositoryRemoteCtrl', detailRepositoryRemoteCtrl)
