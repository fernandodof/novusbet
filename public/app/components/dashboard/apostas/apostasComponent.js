(function () {
    
    var componentName = 'nbApostadorApostas';
    var templateUrl = 'app/components/dashboard/apostas/apostasComponent.html';
    
    angular.module('novusbet.components.dashboard.menu.ApostasComponent', [])
            .directive(componentName, component);

    function component() {
        return {
            templateUrl: templateUrl,
            controller: apostasCtrl,
            controllerAs: '$ctrl',
            scope: {}
        };
    }
    
    apostasCtrl.$inject = []; 

    function apostasCtrl() {
        $ctrl = this;

        $ctrl.test = 'Apostas';
    }

})();