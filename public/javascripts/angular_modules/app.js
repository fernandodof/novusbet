var app = angular.module('novusbet', [
    'ui.router',
    'jcs-autoValidate',
    
    'novusbet.controllers.auth.AuthController',
    'novusbet.validation.ValidationConfig',
    'novusbet.directives.ConfirmPassword',
    'novusbet.directives.UniqueEmailChecker'
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