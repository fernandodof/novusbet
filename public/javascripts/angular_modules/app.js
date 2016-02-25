var app = angular.module('novusbet', [
    'ui.router',
    'jcs-autoValidate',
    
    'novusbet.controllers.auth.AuthController',
    'novusbet.controller.DashboardController',
    
    'novusbet.validation.ValidationConfig',
    
    'novusbet.directives.ConfirmPasswordDirective',
    'novusbet.directives.UniqueEmailCheckerDirective',
    
    'novusbet.services.auth.AuthService'
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
            }).state('dashboard',{
                url: '/dashboard',
                views:{
                    'main' : {
                        templateUrl: 'templates/dashboard.html',
                        controller: 'DashboardController'
                    },
                    'navbar' : {
                        templateUrl: 'templates/navbar.html'
                    },
                    'sidebar':{
                        templateUrl: 'templates/sideMenuApostador.html'
                    }
                }
            }).state('dashboard.sidebar', {
                url : '/sidebar',
                views:{
                    'sidebar':{
                        templateUrl: 'templates/sideMenuApostador.html'
                    }
                }
            });

    $urlRouterProvider.otherwise('/');
    
});