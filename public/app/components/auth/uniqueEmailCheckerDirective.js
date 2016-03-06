angular.module('novusbet.components.auth.UniqueEmailCheckerDirective', []).directive('uniqueEmailChecker', [
    '$q',
    '$http',
    function ($q, $http) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$asyncValidators.uniqueEmailChecker = function (modelValue, viewValue) {
                    var defer = $q.defer();
                    console.log(viewValue);

                    $http.get('apostadores/email/' + viewValue, {
                    }).success(function (response) {
                        console.log(response);
                        if (response.data) {
                            defer.reject(false);
                        } else {
                            defer.resolve(false);
                        }
                    }).error(function (response) {
                        console.log(response);
                    });

                    return defer.promise;
                };
            }
        };
    }]);