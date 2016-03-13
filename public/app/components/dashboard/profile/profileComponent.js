(function () {
    
    var componentName = 'nbApostadorProfile';
    var templateUrl = 'app/components/dashboard/profile/profileComponent.html';
    
    angular.module('novusbet.components.dashboard.menu.ProfileComponent', [])
            .directive(componentName, component);

    function component() {
        return {
            templateUrl: templateUrl,
            controller: profileCtrl,
            controllerAs: '$ctrl',
            scope: {}
        };
    }
    
    profileCtrl.$inject = []; 

    function profileCtrl() {
        $ctrl = this;

        $ctrl.test = 'Test';
    }

})();