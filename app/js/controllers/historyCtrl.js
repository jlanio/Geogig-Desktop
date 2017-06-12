function historyCtrl(){
	/*Get Commit*/
	$s.commits = undefined;
	$s.limit = 2; $s.checked = 0;
    $s.checkChanged = commit => commit.activate ? $s.checked++ : $s.checked--;

    Geogig.log.call($s.Repository()).then(data => {
        $s.commits = JSON.parse(data).response.commit;
        $s.$apply(()=> {
            $s.commits;
        });
    });

	$s.differenceCommit = () => {
        let commitSelected = $s.commits.filter(elem => elem.activate === true);
        Geogig.diffCommit.call($s.Repository(), ...commitSelected)
            .then(features => {
                $s.geojson.data = WKTtoGeojson.init(features);
                $s.$apply(() => $s.geojson.data)
            });
	};

}
angular
.module('geogig-desktop')
.controller('historyCtrl', historyCtrl)


