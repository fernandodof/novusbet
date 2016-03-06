angular.module('novusbet.components.auth.AuthController', []).controller('AuthController', function ($state, AuthService) {
    
    var ctrl = this;
    
    ctrl.signupModel = {};
    ctrl.loginModel = {};
    
    ctrl.animateLogin = false;
    ctrl.animateSignup = false;
    
    ctrl.signup = function () {
        AuthService.signUp(ctrl.signupModel.email, ctrl.signupModel.password)
            .success(function (response) {
                console.log(response);
            }).error(function (response) {
                console.log(response);
            });
    };
    
    ctrl.logout = function (){
        AuthService.logout()
            .success(function(response){
                console.log(response);
            }).error(function (response){
                console.log(response);
            });
    };
    
    ctrl.test = function (){
        console.log('test');
    };
    
    ctrl.checkEmail = function (){
        AuthService.checkEmail()
            .success(function(response){
                console.log(response);
            }).error(function(response){
                console.log(response);
            });
    };
    
    ctrl.login = function (){
        AuthService.login(ctrl.loginModel.email, ctrl.loginModel.password)
            .success(function(response){
                console.log(response);
                if(response.success){
                    $state.go('dashboard');
                }
            }).error(function(response){
                console.log(response);
            });
    };
});