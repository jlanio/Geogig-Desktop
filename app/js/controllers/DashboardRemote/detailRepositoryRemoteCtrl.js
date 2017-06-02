function detailRepositoryRemoteCtrl($scope, $location, toaster, $uibModal, leafletData){
	/*Get Commit*/
	$s.commits = undefined;
	$s.limit = 2; $s.checked = 0;
	$s.commitSelected = {'activate':[]};

	let objeto = JSON.parse(`{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"feature_id":"acre_perimetro/2","type_change":"REMOVED"},"geometry":{"coordinates":[[[-69.10819941542951,0.3444419384510358],[-64.7746251098584,4.2319130066839294],[-46.99422465023582,-0.9301387396581102],[-58.401721719312675,-12.528822910451336],[-69.10819941542951,0.3444419384510358]]],"type":"Polygon"}}]}`)
 	function getColor(d) {
        console.log(d);
        if (d == "ADDED"){
            return '#00CED1'
        }if (d == "MODIFIED"){
            return '#FF8C00'
        }if (d == "REMOVED"){
            return '#DC143C'
        }
    }
    function style(feature) {
            return {
                fillColor: getColor(feature.properties.type_change),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            }
        }

 	angular.extend($s, {
        japan: {
            lat: 37.26,
            lng: 138.86,
            zoom: 4
        },
        geojson: {
        	data: objeto,
            style: style,
        },
	    legend: {
            position: 'bottomleft',
            colors: [ '#00CED1', '#FF8C00', '#BD0026'],
            labels: [ 'ADDED', 'MODIFIED', 'REMOVED' ]
        },
        defaults: {
            tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
    });

	Geogig.log.call($s.Repository()).then(data => {
		$s.commits = JSON.parse(data).response.commit;
		$s.$apply(()=> {
			$s.commits;
		});
	});

    $s.checkChanged = commit => commit.activate ? $s.checked++ : $s.checked--;

	$s.differenceCommit = () => {
		let commitActiv = $s.commits.filter(elem => elem.activate === true);
		let geojsonFeature = Geogig.diffCommit.call($s.Repository(), ...commitActiv).then(features => WKTtoGeojson.init(features));
		geojsonFeature.then(features => {
			/*let a = features.features.map(f => style(f));
			console.log(a);*/
			/*.forEach(f => style(features))*/
			$s.geojson.data = features;
			$s.$apply(()=> $s.geojson.data);
		})
	};

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


