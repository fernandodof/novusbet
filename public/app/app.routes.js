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
                        templateUrl: 'app/components/dashboard/dashboardView.html'
                    }
                }
            })
            .state('profile', {
                url: '/profile',
                parent: 'dashboard',
                views: {
                    dashboardContent: {
                        templateUrl: 'app/components/dashboard/apostadorProfileView.html'
                    }
                }
            })
            .state('apostas', {
                url: '/apostas',
                parent: 'dashboard',
                views: {
                    dashboardContent: {
                        templateUrl: 'app/components/dashboard/apostadorApostasView.html'
                    }
                }
            })
            .state('resultados', {
                url: '/resultados',
                parent: 'dashboard',
                views: {
                    dashboardContent: {
                        templateUrl: 'app/components/dashboard/apostadorResultadosView.html'
                    }
                }
            })
            ;

    $urlRouterProvider.otherwise('/');

});