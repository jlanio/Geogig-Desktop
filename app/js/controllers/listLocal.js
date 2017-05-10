function listLocal($scope, alert){
	$s.NewRepo = () => alert.open("New Repository","Name:","input","...",
		(inputValue) => {
			if (inputValue === false) return false;
			if (inputValue === "") {
				swal.showInputError("the field is empty!");
				return false
			}else{
				new MainCtrl(inputValue).new()
				.then(q=>swal("Success", q +" created.", "success"))
				
			}
	});
	idForDelete = [];
	$s.checkbox = (id)=>{
		idForDelete.indexOf(id)> -1 ? idForDelete.splice(-1, 1) : idForDelete.push(id);
	};

	$s.deleteRepo = () => console.log("PARA DELETAR: ",idForDelete)

}
angular
.module('geogig-desktop')
.controller('listLocal', listLocal)