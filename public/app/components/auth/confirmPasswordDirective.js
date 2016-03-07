angular.module('novusbet.components.auth.ConfirmPasswordDirective', []).directive('confirmPassword', function (defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['confirmPassword'] = 'Senhas não conferem';
    });

    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            confirmPassword: '=confirmPassword'
        },
        link: function (scope, element, attributes, ngModel) {
            ngModel.$validators.confirmPassword = function (modelValue) {
                return modelValue === scope.confirmPassword;
            };

            scope.$watch('confirmPassword', function () {
                ngModel.$validate();
            });
        }
    };
});