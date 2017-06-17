(() => {
    angular.module('geogig-desktop', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'pascalprecht.translate',       // Angular Translate
        '19degrees.ngSweetAlert2',		//SweetAlert2
        'nemLogging',					//Dependence ui-leaflet
        'ui-leaflet'					//ui-leaflet

    ])
})();
