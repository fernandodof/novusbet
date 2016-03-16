var app = angular.module('novusbet', [
    'ui.router',
    'jcs-autoValidate',
    'mobile-angular-ui',
    //Routes config
    'novusbet.config.routes',
    //Validation config
    'novusbet.shared.validation.ValidationConfig',
    //Auth
    'novusbet.components.auth.authComponent',
    'novusbet.components.auth.ConfirmPasswordDirective',
    'novusbet.components.auth.UniqueEmailCheckerDirective',
    'novusbet.components.auth.AuthService',
    'ngCookies',
    //Dashboard
    'novusbet.components.dashboard.menu.menuComponent',
    //Dashboard / Profile
    'novusbet.components.dashboard.menu.ProfileComponent',
    //Dashboard / Apostas 
    'novusbet.components.dashboard.menu.ApostasComponent',
    //Dashboard / Resultados
    'novusbet.components.dashboard.menu.ResultadosComponent'
]).run(function ($rootScope, $http, $cookieStore, $state) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
        // redirect to login page if not logged in and trying to access a restricted page
        var publicStates = ['login']; 
        var restrictedPage = publicStates.indexOf(toState.name) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        console.log(restrictedPage, loggedIn, $rootScope.globals.currentUser, publicStates.indexOf(toState.name));

        if (restrictedPage && !loggedIn) {
            console.log('redirect');
            $state.go('login');
        }
    });
});
