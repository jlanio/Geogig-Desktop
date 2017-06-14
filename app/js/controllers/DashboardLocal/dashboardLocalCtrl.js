function dashboardLocalCtrl(){
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
	idForDelete = [];
	s.checkbox = (id)=>{
		idForDelete.indexOf(id)> -1 ? idForDelete.splice(-1, 1) : idForDelete.push(id);
	};

	s.deleteRepo = () => console.log("For Delete: ",idForDelete);
}
angular
.module('geogig-desktop')
.controller('dashboardLocalCtrl', dashboardLocalCtrl)