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
            data:  function(){
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
                    files: ['js/plugins/leaflet/plugins/wkt_to_geojson/wicket.js', 'js/plugins/leaflet/plugins/wkt_to_geojson/wicket-leaflet.js']
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
        data: { pageTitle: 'Repositório Local' },
        controller: 'repo_view'
    })
    .state('repo.view', {
        url: "/view",
        templateUrl: "views/paginas/repositorio_local/main_view.html",
        data: { pageTitle: 'Repositório View' },
        controller: 'repositorio'

    })
    .state('repo.issue', {
        url: "/issue",
        templateUrl: "views/paginas/issue_tracker.html",
        data: { pageTitle: 'Repositório Issue' },

    })
    .state('repo.remoto', {
        url: "/remoto",
        templateUrl: "views/paginas/repositorio_remoto/main.html",
        data: { pageTitle: 'Servidor Remoto' },
        controller: 'repositorio_remoto'
    })
    .state('repo.view_remoto', {
        url: "/view_remoto",
        templateUrl: "views/paginas/repositorio_remoto/main_repositorios.html",
        data: { pageTitle: 'Repositório Remoto' },
        controller: 'repositorio_remoto'
    })
    .state('repo.remoto_repo', {
        url: "/remoto_repo",
        templateUrl: "views/paginas/repositorio_remoto/main_repositorio_view.html",
        data: { pageTitle: 'Repositório Remoto View' },
        controller: 'repositorio_remoto'
    })
    .state('repo.config', {
        url: "/config_user",
        templateUrl: "views/paginas/config.html",
        data: { pageTitle: 'Página para Configuração' }
    })
    .state('repo.historico', {
        url: "/historico",
        templateUrl: "views/paginas/timeline.html",
        data: { pageTitle: 'Repositório Historico' }
    })
    .state('repo.map', {
        url: "/map",
        templateUrl: "views/map.html",
        data: { pageTitle: 'map' }
    })
}
angular
.module('geogig-desktop')
.config(config)
.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
    'OPTIONS': 'Options',
    'ADD_REPOSITORIES': 'Add Repositories',
    'LOCAL_REPOSITORIES': 'Local Repositories',
    'REMOTE_REPOSITORIES': 'Remote Repositories',
    'CONFIGURATION': 'Configuration',
    'REPOSITORY_HISTORY': 'Repository History',
    'REPOSITORY': 'Repositor(y|ies)',
    'ORIGIN': 'Origin',
    'ADDRESS': 'Address',
    'LAYERS': 'Layers',
    'PULL': 'Pull',
    'PUSH': 'Push',
    'PUBLISH': 'Publish',
    'DOWNLOAD_ALL': 'Download all',
    'DOWNLOAD': 'Download',
    'DIFFERENCE': 'Difference',
    'ADD_NEW_LAYER': 'Add new layer',
    'ADD_NEW_ISSUE': 'Add new issue',
    'HISTORY': 'History',
    'ANALYZE': 'Analyze',
    'ACTIONS': 'Actions',
    'ADD': 'Add',
    'ADDED': 'Added',
    'BUG': 'Bug',
    'FIXED': 'Fixed',
    'COMMIT': 'Commit',
    'NEW': 'New',
    'FOUND': 'Found',
    'ISSUES_LC': 'issues',
    'LOCAL': 'Local',
    'LOCAL_NETWORK': 'Local network',
    'SEARCH': 'Search',
    'CLONE': 'Clone',
    'REMOTE': 'Remote',
    'CONNECTED': 'Connected',
    'CONNECTED_IN': 'Connected',
    'LATEST_ACTIVITY': 'Latest activity',
    'MOVE_TO_TRASH': 'Move to trash',
    'MARK_AS_READ': 'Mark as read',
    'SAVE': 'Save',
    'SUBMIT': 'Submit',
    'EMAIL': 'Email',
    'NAME': 'Name'
  });

  $translateProvider.translations('es', {
    'OPTIONS': 'Opções',
    'ADD_REPOSITORIES': 'Adicionar Repositorio',
    'LOCAL_REPOSITORIES': 'Repositorio Local',
    'REMOTE_REPOSITORIES': 'Repositorio Remoto',
    'CONFIGURATION': 'Configuração',
    'REPOSITORY_HISTORY': 'Repositório Historico',
    'REPOSITORY': 'Repositorio(s)',
    'ORIGIN': 'Origen',
    'ADDRESS': '',
    'LAYERS': 'Camadas',
    'PULL': '',
    'PUSH': '',
    'PUBLISH': '',
    'DOWNLOAD_ALL': 'Descargar todo',
    'DOWNLOAD': 'Descargar',
    'DIFFERENCE': 'Diferencia',
    'ADD_NEW_LAYER': 'Adicionar nova camada',
    'ADD_NEW_ISSUE': 'Adicionar nova asunto',
    'HISTORY': '',
    'ANALYZE': 'Analisar',
    'ACTIONS': 'Acciones',
    'ADD': 'Añadir',
    'ADDED': 'Sumado',
    'BUG': 'Bug',
    'FIXED': 'Fijo',
    'COMMIT': '',
    'NEW': 'Novo',
    'FOUND': 'Encontró',
    'ISSUES_LC': 'asunto',
    'LOCAL': 'Local',
    'LOCAL_NETWORK': 'Rede local',
    'SEARCH': '',
    'CLONE': '',
    'REMOTE': 'Remoto',
    'CONNECTED': 'Conectado',
    'CONNECTED_IN': 'Conectado en',
    'LATEST_ACTIVITY': 'Ultimas Atividades',
    'MOVE_TO_TRASH': 'Move to trash',
    'MARK_AS_READ': 'Mark as read',
    'SAVE': 'Salva',
    'SUBMIT': 'Enviar',
    'EMAIL': 'Email',
    'NAME': 'Nombre'
  });

  $translateProvider.preferredLanguage('en');
}])
.run(function($rootScope, $state) {
    $rootScope.$state = $state;
});
