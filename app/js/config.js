function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/main/local");
    $ocLazyLoadProvider.config({debug: false});

    $stateProvider
    .state('main', {
        abstract: true,
        url: "/main",
        data: { pageTitle: 'Geodig' },
        templateUrl: "views/common/content.html",
        controller: "initConfigCtrl",
        resolve: {
            dbGeogig:  () => db.open().then((data) =>  data),
            controller: function(dbGeogig){
                mydb = dbGeogig
            },
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                {
                    insertBefore: '#loadBefore',
                    name: 'toaster',
                    files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                },
                {
                    files: ['js/plugins/leaflet/plugins/wkt_to_geojson/wicket.js', 'js/plugins/leaflet/plugins/wkt_to_geojson/wicket-leaflet.js']
                }
                ]);
            }
        }
    })
    .state('main.local', {
        url: "/local",
        templateUrl: "views/paginas/DashboardLocal/dashboardLocal.html",
        controller: 'dashboardLocalCtrl'
    })
    .state('main.view', {
        url: "/view",
        templateUrl: "views/paginas/DashboardLocal/detailRepositoryLocal.html",
        controller: 'detailRepositoryLocalCtrl'

    })
    .state('main.issue', {
        url: "/issue",
        templateUrl: "views/paginas/issue_tracker.html",

    })
    .state('main.remoto', {
        url: "/remoto",
        templateUrl: "views/paginas/DashboardRemote/dashboardRemote.html",
        controller: 'detailRepositoryRemoteCtrl'
    })
    .state('main.view_remoto', {
        url: "/view_remoto",
        templateUrl: "views/paginas/DashboardRemote/detailRepositoryRemote.html",
        controller: 'detailRepositoryRemoteCtrl'
    })
    .state('main.remoto_repo', {
        url: "/remoto_repo",
        templateUrl: "views/paginas/repositorio_remoto/main_repositorio_view.html",
        controller: 'repositorio_remoto'
    })
    .state('main.config', {
        url: "/config_user",
        templateUrl: "views/paginas/config.html",
        controller: 'listLocal'
    })
    .state('main.historico', {
        url: "/historico",
        templateUrl: "views/paginas/timeline.html"
    })
    .state('main.map', {
        url: "/map",
        templateUrl: "views/map.html"
    })
}
angular
.module('geogig-desktop')
.config(config)
.config(['$translateProvider', $translateProvider => {
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.useStaticFilesLoader({
        prefix: 'translation\\',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en-us');
}])
.run(($rootScope, $state) => $rootScope.$state = $state);
