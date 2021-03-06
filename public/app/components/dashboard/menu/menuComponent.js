(function () {

    var componentName = 'nbApostadorMenu';
    var templateUrl = 'app/components/dashboard/menu/menuComponent.html';

    angular.module('novusbet.components.dashboard.menu.menuComponent', [])
            .directive(componentName, component);

    function component() {
        return {
            templateUrl: templateUrl,
            controller: menuCtrl,
            controllerAs: '$ctrl',
            scope: {}
        };
    }

    menuCtrl.$inject = ['AuthService', '$state'];

    function menuCtrl(AuthService, $state) {
        $ctrl = this;

        $ctrl.logout = function(){
            AuthService.clearCredentials();
                AuthService.logout();
                $state.go('login');
        };
        
        $ctrl.test = function(){
            AuthService.test()
                .success(function (response){
                    console.log(response);
                })
                .error(function (response){
                    console.log(response);
                });
        };
    }

})();