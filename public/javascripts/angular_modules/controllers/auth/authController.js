angular.module('novusbet.controllers.auth.AuthController', []).controller('AuthController', function ($scope, $state, $http) {
    $scope.signupModel = {};

    $scope.signup = function () {
        $http.post('/signup', {
            email: $scope.signupModel.email,
            password: $scope.signupModel.password
        }).success(function (response) {
            console.log(response);
        }).error(function (response) {
            console.log(response);
        });
    };
    
    $scope.logout = function (){
        $http.get('logout', {
            
        }).success(function(response){
            console.log(response);
        }).error(function (response){
            console.log(response);
        });
    };
});