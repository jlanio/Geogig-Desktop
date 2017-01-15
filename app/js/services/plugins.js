function alert (SweetAlert){
    var _open = function (titulo, text, type, inputPlaceholder, data){
      return SweetAlert.swal({
        title: titulo,
        text: text,
        type: type,
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: inputPlaceholder,
        showLoaderOnConfirm: true
      },data);
  }

  return {
    open: _open
  };

};
angular
.module("gitgeo")
.factory("alert", alert)
