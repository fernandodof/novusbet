(function () {

    angular.module('novusbet.components.auth.authInterceptor', []).factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$injector'];

    function authInterceptor($injector) {
        var AuthService = $injector.get('AuthService');
        return {
            // automatically attach Authorization header
            request: function (config) {
                var token = AuthService.getToken();
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }

                return config;
            },
            // If a token was sent back, save it
            response: function (res) {
                if (res.data.token) {
                    AuthService.saveToken(res.data.token);
                }

                return res;
            }
        };
    }

})();