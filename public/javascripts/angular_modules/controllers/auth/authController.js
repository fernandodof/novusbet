angular.module('novusbet.controllers.auth.AuthController', []).controller('AuthController', function ($scope, $state, AuthService) {
    $scope.signupModel = {};
    $scope.loginModel = {};

    $scope.signup = function () {
        AuthService.signUp($scope.signupModel.email, $scope.signupModel.password)
            .success(function (response) {
                console.log(response);
            }).error(function (response) {
                console.log(response);
            });
    };
    
    $scope.logout = function (){
        AuthService.logout()
            .success(function(response){
                console.log(response);
            }).error(function (response){
                console.log(response);
            });
    };
    
    $scope.checkEmail = function (){
        AuthService.checkEmail()
            .success(function(response){
                console.log(response);
            }).error(function(response){
                console.log(response);
            });
    };
    
    $scope.login = function (){
        AuthService.login($scope.loginModel.email, $scope.loginModel.password)
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