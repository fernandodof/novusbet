(function () {
    angular.module('novusbet.components.dashboard.DashboardController', []).controller('DashboardController', dashboardController);

    dashboardController.$inject = ['$scope','$state'];

    function dashboardController($scope, $state) {
        ctrl = this;

        ctrl.sidebarToggle = true;

        var mobileView = 992;

        ctrl.getWidth = function () {
            return window.innerWidth;
        };

        $scope.$watch(ctrl.getWidth, function (newValue) {
            if (newValue >= mobileView) {
                ctrl.sidebarToggle = true;
            } else {
                ctrl.sidebarToggle = false;
            }
        });

        window.onresize = function () {
            $scope.$apply();
        };

        ctrl.changeState = function (state) {
            $state.go(state);
        };

    }

})();
