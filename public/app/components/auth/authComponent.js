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
        $ctrl.isLoggingIn = false;

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
            $ctrl.isLoggingIn = true;
            AuthService.login($ctrl.loginModel.email, $ctrl.loginModel.password)
                    .then(function (response) {
                        var token = response.data ? response.data.token : null;
                        if (token) {
                            console.log('JWT:', token);
                        }
                        console.log(response.data.message);
                        $ctrl.isLoggingIn = false;
                    });
//            AuthService.login($ctrl.loginModel.email, $ctrl.loginModel.password)
//                    .success(function (response) {
//                        console.log(response);
//                        if (response.success) {
//                            AuthService.setCredentials(response.data.local.email, response.data.id, response.data.token);
//                            $state.go('dashboard');
//                        }
//                        $ctrl.isLoggingIn = false;
//                    })
//                    .error(function (response) {
//                        console.log(response);
//                        $ctrl.isLoggingIn = false;
//                    });
        };
    }

})();