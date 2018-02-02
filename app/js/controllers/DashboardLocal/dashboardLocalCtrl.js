function dashboardLocalCtrl(){

	s.geogigServe.repos.findAll().then(repos => {
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
						s.NameRepo = NameRepo;
						resolve(s.geogig.repo({name: NameRepo}).init)
					}
				})
			},
			allowOutsideClick: false
		}).then(q => {
			commitInit();
			swal({
				type: 'success',
				title: `Repository  success!`,
				html: `log: <h5> ${q}</h5>`
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

	let commitInit = function () {
		s.geogigServe.repos.findOne({ name: s.NameRepo}).then(repo =>
			 {
				repo.beginTransaction().then(data => {
					let id = data.Transaction.ID;
					let endTransaction = () => repo.endTransaction({transactionId: id},{cancel: false})
					repo.commit(
						{transactionId: id},{message: 'Inicial Commit', all: true}
					).then(log => endTransaction())
				})

			}
		)
	}
}
angular
.module('geogig-desktop')
.controller('dashboardLocalCtrl', dashboardLocalCtrl)
