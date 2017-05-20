function dashboardLocalCtrl($scope, $translate){
	$s.NewRepo = () => {
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
						resolve(new MainCtrl(NameRepo).new())
					}
				})
			},
			allowOutsideClick: false
		}).then(q => {
			swal({
				type: 'success',
				title: `Repository  success!`,
				html: `log: <h5> ${q}</h5>`
			})
		})
	}
	idForDelete = [];
	$s.checkbox = (id)=>{
		idForDelete.indexOf(id)> -1 ? idForDelete.splice(-1, 1) : idForDelete.push(id);
	};

	$s.deleteRepo = () => console.log("For Delete: ",idForDelete);
	
	$scope.changeLanguage =  langKey =>  $translate.use(langKey);

}
angular
.module('geogig-desktop')
.controller('dashboardLocalCtrl', dashboardLocalCtrl)