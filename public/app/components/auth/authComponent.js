(function () {
    
    var componentName = 'nbAuthView';
    var templateUrl = 'app/components/auth/authComponent.html';
    
    angular.module('novusbet.components.auth.authComponent', [])
            .directive(componentName, component);

    function component() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: templateUrl,
            controller: authController,
            controllerAs: '$ctrl'
        };
    }
    
    authController.$inject = ['$state', 'AuthService'];

    function authController($state, AuthService) {

        var $ctrl = this;

        $ctrl.signupModel = {};
        $ctrl.loginModel = {};

        $ctrl.showLoginForm = true;

        $ctrl.signup = function () {
            AuthService.signUp($ctrl.signupModel.email, $ctrl.signupModel.password)
                    .success(function (response) {
                        console.log(response);
                    }).error(function (response) {
                console.log(response);
            });
        };

        $ctrl.logout = function () {
            AuthService.logout()
                    .success(function (response) {
                        console.log(response);
                    }).error(function (response) {
                console.log(response);
            });
        };

        $ctrl.test = function () {
            console.log('test');
        };

        $ctrl.checkEmail = function () {
            AuthService.checkEmail()
                    .success(function (response) {
                        console.log(response);
                    }).error(function (response) {
                console.log(response);
            });
        };

        $ctrl.login = function () {
            AuthService.login($ctrl.loginModel.email, $ctrl.loginModel.password)
                    .success(function (response) {
                        console.log(response);
                        if (response.success) {
                            AuthService.setCredentials(response.data.local.email, response.data.id);
                            $state.go('dashboard');
                        }
                    }).error(function (response) {
                console.log(response);
            });
        };
    }

})();