(function () {
    
    var componentName = 'nbApostadorProfile';
    var templateUrl = 'app/components/dashboard/profile/profileComponent.html';
    
    angular.module('novusbet.components.dashboard.menu.ProfileComponent', [])
            .directive(componentName, component);

    function component() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: templateUrl,
            controller: profileCtrl,
            controllerAs: '$ctrl'
        };
    }
    
    profileCtrl.$inject = []; 

    function profileCtrl() {
        $ctrl = this;

        $ctrl.test = 'Test';
        $ctrl.profileForm = {};
        
        $ctrl.submit = function(){
            console.log($ctrl.profileForm.name);    
        };
    }

})();