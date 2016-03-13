(function () {

    angular.module('novusbet.components.dashboard.ProfileController', []).controller('ProfileController', profileController);

    profileController.$inject = ['$scope']; 

    function profileController($scope) {
        ctrl = this;

        ctrl.test = 'Test';
    }

})();