function historyCtrl(){
	/*Get Commit*/
	$s.commits = undefined;
    let commitSelected = [];
	$s.limit = 2; $s.checked = 0;

    $s.checkChanged = commit => {
        commit.activate ? $s.checked++ : $s.checked--;
        commit.activate ? commitSelected.push(commit.id) : checkIdAndRemove(commit.id);
        checkIdAndRemove = (id) => {
            let commitId = commitSelected.indexOf(id);
            if (commitId > -1) {
                commitSelected.splice(commitId, 1);
            }
        }
    }

    Geogig.log.call($s.Repository()).then(data => {
        $s.commits = JSON.parse(data).response.commit;
        $s.$apply(()=> {
            $s.commits;
        });
    });

	$s.differenceCommit = () => {
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


