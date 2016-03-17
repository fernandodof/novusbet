angular.module('novusbet.config.routes', []).config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
            .state('login', {
                url: '/',
                views: {
                    main: {
                        templateUrl: 'app/components/auth/loginSignupView.html'
                    }
                },
                authenticate: false
            })
            .state('dashboard', {
                url: '/dashboard',
                views: {
                    navbars:{
                        templateUrl: 'app/shared/navbars/navbars.html'
                    },
                    sidebarDashboard:{
                        templateUrl: 'app/components/dashboard/menu/menuComponentView.html'
                    },
                    main: {
                        templateUrl: 'app/components/dashboard/dashboardView.html'
                    }
                },
                authenticate: true
            })
            .state('perfil', {
                url: '/perfil',
                parent: 'dashboard',
                views: {
                    dashboardContent: {
                        templateUrl: 'app/components/dashboard/apostadorProfileView.html'
                    }
                },
                authenticate: true
            })
            .state('apostas', {
                url: '/apostas',
                parent: 'dashboard',
                views: {
                    dashboardContent: {
                        templateUrl: 'app/components/dashboard/apostadorApostasView.html'
                    }
                },
                authenticate: true
            })
            .state('resultados', {
                url: '/resultados',
                parent: 'dashboard',
                views: {
                    dashboardContent: {
                        templateUrl: 'app/components/dashboard/apostadorResultadosView.html'
                    }
                },
                authenticate: true
            });

    $urlRouterProvider.otherwise('/');

});