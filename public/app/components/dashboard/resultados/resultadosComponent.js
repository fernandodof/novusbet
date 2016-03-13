(function () {
    
    var componentName = 'nbApostadorResultados';
    var templateUrl = 'app/components/dashboard/resultados/resultadosComponent.html';
    
    angular.module('novusbet.components.dashboard.menu.ResultadosComponent', [])
            .directive(componentName, component);

    function component() {
        return {
            templateUrl: templateUrl,
            controller: resultadosCtrl,
            controllerAs: '$ctrl',
            scope: {}
        };
    }
    
    resultadosCtrl.$inject = []; 

    function resultadosCtrl() {
        $ctrl = this;

        $ctrl.test = 'Resultados';
    }

})();