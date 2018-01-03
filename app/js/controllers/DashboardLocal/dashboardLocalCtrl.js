function dashboardLocalCtrl(){

	s.geogig.repos.findAll().then(repos => {
		s.$apply(() => s.repos = repos)
	})

	s.NewRepo = () => {
		swal({
			title: 'New Repository',
			input: 'text',
			showCancelButton: true,
			confirmButtonText: 'Submit',
			showLoaderOnConfirm: true,
			preConfirm:  NameRepo => {
				return new Promise((resolve, reject) => {
					if (!NameRepo) {
						reject('the field is empty!')
					} else {
						let newRepository = new Repository(NameRepo);
						resolve(Geogig.init.call(newRepository))
					}
				})
			},
			allowOutsideClick: false
		}).then(q => {
			swal({
				type: 'success',
				title: `Repository  success!`,
				html: `log: <h5> ${q[0]}</h5>`
			})
		})
	}

	s.deleteRepository = (idFordelete) => {
		swal({
			title: 'Your repository will be deleted, do you want to continue?',
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
			confirmButtonClass: 'btn btn-success',
			cancelButtonClass: 'btn btn-danger',
			buttonsStyling: false
		}).then(() => {
			db.removeLocalRepository(idFordelete)
			swal('Deleted!', 'Your repository has been deleted.','success')
		}, (dismiss) => {
		if (dismiss === 'cancel')
			swal('Cancelled','Your repository is safe :)','error')
		})

	};
}
angular
.module('geogig-desktop')
.controller('dashboardLocalCtrl', dashboardLocalCtrl)
