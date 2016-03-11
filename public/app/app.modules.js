var app = angular.module('novusbet', [
    'ui.router',
    'ui.bootstrap',
    'jcs-autoValidate',
    
    //Routes config
    'novusbet.config.routes',
    
    //Validation config
    'novusbet.shared.validation.ValidationConfig',
    
    //Auth
    'novusbet.components.auth.AuthController',
    'novusbet.components.auth.ConfirmPasswordDirective',
    'novusbet.components.auth.UniqueEmailCheckerDirective',
    'novusbet.components.auth.AuthService',
    
     //Dashboard
    'novusbet.components.dashboard.DashboardController',
    
    //Dashboard / Profile
    'novusbet.components.dashboard.ProfileController'
]);
