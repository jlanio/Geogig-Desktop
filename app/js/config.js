function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/repo/local");

    $ocLazyLoadProvider.config({
        debug: false
    });

    $stateProvider
    .state('repo', {
        abstract: true,
        url: "/repo",
        templateUrl: "views/common/content.html",
        resolve: {
            data:  function(db){
                        return db.open().then(function (data) {
                            return data;
                        });
            },
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                {
                    insertBefore: '#loadBefore',
                    name: 'toaster',
                    files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                },
                {
                    files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                },
                {
                    name: 'oitozero.ngSweetAlert',
                    files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                }
                ]);
            }
        },
        controller: function(data){
          mydb = data;
        }
    })
    .state('repo.local', {
        url: "/local",
        templateUrl: "views/paginas/repositorio_local/main.html",
        data: { pageTitle: 'Repositório Local' }
    })
    .state('repo.view', {
        url: "/view",
        templateUrl: "views/paginas/repositorio_local/main_view.html",
        data: { pageTitle: 'Repositório View' }

    })
    .state('repo.historico', {
        url: "/historico",
        templateUrl: "views/paginas/timeline.html",
        data: { pageTitle: 'Repositório Historico' }
    })
    .state('repo.issue', {
        url: "/issue",
        templateUrl: "views/paginas/issue_tracker.html",
        data: { pageTitle: 'Repositório Issue' },

    })
    .state('repo.remoto', {
        url: "/remoto",
        templateUrl: "views/paginas/repositorio_remoto/main.html",
        data: { pageTitle: 'Servidor Remoto' }
    })
    .state('repo.view_remoto', {
        url: "/view_remoto",
        templateUrl: "views/paginas/repositorio_remoto/main_repositorios.html",
        data: { pageTitle: 'Repositório Remoto' }
    })
    .state('repo.remoto_repo', {
        url: "/remoto_repo",
        templateUrl: "views/paginas/repositorio_remoto/main_repositorio_view.html",
        data: { pageTitle: 'Repositório Remoto View' }
    })
    .state('repo.config', {
        url: "/config_user",
        templateUrl: "views/paginas/config.html",
        data: { pageTitle: 'Página para Configuração' }
    })
}
angular
.module('gitgeo')
.config(config)
.run(function($rootScope, $state, db) {
    $rootScope.$state = $state;
});
