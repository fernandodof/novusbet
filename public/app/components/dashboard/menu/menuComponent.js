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

    menuCtrl.$inject = ['$scope', '$state'];

    function menuCtrl($scope, $state) {
        $ctrl = this;

        $ctrl.sidebarToggle = true;

        var mobileView = 992;

        $ctrl.getWidth = function () {
            return window.innerWidth;
        };

        $scope.$watch($ctrl.getWidth, function (newValue) {
            if (newValue >= mobileView) {
                $ctrl.sidebarToggle = true;
            } else {
                $ctrl.sidebarToggle = false;
            }
            console.log($ctrl.sidebarToggle);
        });

        $scope.$watch(function(){return $ctrl.sidebarToggle;}, function (newValue) {
            console.log(newValue);
        });

        window.onresize = function () {
            $scope.$apply();
        };

        $ctrl.changeState = function (state) {
            $state.go(state);
        };

    }

})();