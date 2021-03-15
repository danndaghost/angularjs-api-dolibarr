/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 */
function config($stateProvider, $urlRouterProvider,$httpProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/login");

    //agregar header token
    $httpProvider.interceptors.push('httpRequestInterceptor');
    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: "LoginCtrl",
            data: { pageTitle: 'Iniciar sesión' }
        })
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            data: { pageTitle: 'Tablero de reportes' }
        })
        .state('app', {
            abstract: true,
            url: "/app",
            templateUrl: "views/common/content-app.html",
        })
        .state('app.home', {
            url: "/home",
            templateUrl: "views/app/home.html",
            data: { pageTitle: 'Home' }
        })
        .state('app.proposals', {
            url: "/proposals",
            templateUrl: "views/app/proposals.html",
            data: { pageTitle: 'Proposals' }
        })
}

function httpRequestInterceptor($window){
    return {
        request: function (config) {

            if($window.sessionStorage.getItem('token')){
                config.headers['DOLAPIKEY'] = $window.sessionStorage.getItem('token');
            }
            return config;
        }
    };
}

angular
    .module('inspinia')
    .config(config)
    .factory('httpRequestInterceptor', httpRequestInterceptor);
    /*.run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });*/


