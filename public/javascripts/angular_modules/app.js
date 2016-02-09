var app = angular.module('novusbet', [
    'ui.router',
    'novusbet.controllers.auth.AuthController'
]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('login', {
                url: '/',
                views: {
                    'main': {
                        templateUrl: 'templates/loginSignup.html',
                        controller: 'AuthController'
                    },
                    'navbar':{
                        templateUrl: 'templates/navbar.html'
                    }
                }
            });

    $urlRouterProvider.otherwise('/');
    
});