angular.module('novusbet.config.routes', []).config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
            .state('login', {
                url: '/',
                views: {
                    main: {
                        templateUrl: 'app/components/auth/loginSignupView.html',
                        controller: 'AuthController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('dashboard', {
                url: '/dashboard',
                views: {
                    main: {
                        templateUrl: 'app/components/dashboard/dashboardView.html',
                        controller: 'DashboardController',
                        controllerAs: 'ctrl'
                    }
                }
            });

    $urlRouterProvider.otherwise('/');

});