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

    menuCtrl.$inject = [];

    function menuCtrl() {
        $ctrl = this;

    }

})();