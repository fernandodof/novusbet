var app = angular.module('novusbet', [
    'ui.router',
//    'ui.bootstrap',
    'jcs-autoValidate',
    'mobile-angular-ui',
    
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
    'novusbet.components.dashboard.menu.menuComponent',
    
    //Dashboard / Profile
    'novusbet.components.dashboard.menu.ProfileComponent',
    
    'novusbet.components.dashboard.menu.ApostasComponent',
    
    'novusbet.components.dashboard.menu.ResultadosComponent'
]);
