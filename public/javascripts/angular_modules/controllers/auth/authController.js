angular.module('novusbet.controllers.auth.AuthController', []).controller('AuthController', function ($scope, $state, $http) {
    $scope.signUpModel = {};
    
    $scope.signup = function () {
        console.log('singup');
    };
});