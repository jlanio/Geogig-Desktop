function listLocal($scope, alert){
	function NewRepoCrl (inputValue){
		if (inputValue === false) return false;
		if (inputValue === "") {
			swal.showInputError("the field is empty!");
			return false
		}else{
			new Ctrl(inputValue).new(stdout=>swal("Success", stdout +" created.", "success"))
			
		}
	}
	$s.NewRepo = function(){
		alert.open(
			"New Repository",
			"Name:",
			"input",
			"...",
			NewRepoCrl)
	};
	
	arrayCheked = []
	$s.checkbox = function(key){
		arrayCheked.indexOf(key);
		if (index > -1){
			arrayCheked.splice(index, 1);
		}else{
			arrayCheked.push(key);
		}
	};

	$s.deleteRepo = function(){
		console.log("PARA DELETAR: ",arrayCheked );
	}

}
angular
.module('geogig-desktop')
.controller('listLocal', listLocal)