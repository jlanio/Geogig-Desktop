function detailRepositoryRemoteCtrl($scope, $location, toaster, $uibModal){
	/*Get Commit*/
	$s.commits = undefined;
	$s.limit = 2; $s.checked = 0;
	$s.commitSelected = {'activate':[]};
	
	Geogig.log.call($s.Repository()).then(data => {
		$s.commits = JSON.parse(data).response.commit;
			setTimeout(() => { 
				$s.$apply(()=> $s.commits);
	    	}, 100);
	});
    $s.checkChanged = commit => commit.activate ? $s.checked++ : $s.checked--;

	$s.compareCommit = () => {
		console.log($s.commitSelected);
		/*var commidId = [];
		load.forEach(element => element.activate ? commidId.push(element.id) : false);
		
		new Commit($geogig.Repository, null, commidId[1], commidId[0])
		.diffCommit()
		.then(q => {
			LocalStorage.set("geojson", WKTtoGeojson.init(q));
			$location.path('/main/map');
		}).catch(q => console.log(q))*/
	}
	$s.selected = (id) => {
		console.log(id)
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


