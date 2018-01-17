function timeliteCtrl( $location){
	/*Get Commit*/
    let commitSelected = [];
    s.commits = 'teste';
    s.limit = 2;
    s.checked = 0;


      s.currentRepo.then(repo => repo.log()).then(response => {
         s.$apply(()=> s.commits = response.commit)
      })


    s.checkChanged = commit => {
        commit.activate ? s.checked++ : s.checked--;
        commit.activate ? commitSelected.push(commit.id) : checkIdAndRemove(commit.id);
        checkIdAndRemove = (id) => {
            let commitId = commitSelected.indexOf(id);
            if (commitId > -1) {
                commitSelected.splice(commitId, 1);
            }
        }
    }

	s.differenceCommit = () => {
    s.currentRepo.then(repo => repo.Diff({
      oldRefSpec: commitSelected[0],
      newRefSpec: commitSelected[1],
      showGeometryChanges: true
    }))
    .then(response => {
      s.geojson.geogigLayer.data = WKTtoGeojson.init(response)
    })
	};
}
angular
.module('geogig-desktop')
.controller('timeliteCtrl', timeliteCtrl)
