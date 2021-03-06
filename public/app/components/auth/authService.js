(function () {

    angular.module('novusbet.components.auth.AuthService', []).service('AuthService', authService);

    authService.$inject = ['$injector', '$rootScope', '$cookieStore', '$localStorage', '$window'];

    function authService($injector, $rootScope, $cookieStore, $localStorage, $window) {
        var $http = $injector.get('$http');
        var self = {
            signUp: function (email, password) {
                return $http.post('/v1/auth/signup', {
                    email: email,
                    password: password
                });
            },
//            logout: function () {
//                return $http.get('/v1/auth/logout', {});
//            },
            checkEmail: function (email) {
                return $http.get('/v1/auth/apostadores/email/' + email, {});
            },
            login: function (email, password) {
                return $http.post('/v1/auth/login', {
                    email: email,
                    password: password
                });
            },
            parseJwt: function (token) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse($window.atob(base64));
            },
            saveToken: function (token) {
                $window.localStorage['jwtToken'] = token;
            },
            getToken: function () {
                return $window.localStorage['jwtToken'];
            },
            isAuthed: function () {
                var token = self.getToken();
                if (token) {
                    var params = self.parseJwt(token);
                    return Math.round(new Date().getTime() / 1000) <= params.exp;
                } else {
                    return false;
                }
            },
            logout: function() {
                $window.localStorage.removeItem('jwtToken');
            },
            setCredentials: function (userEmail, id, token) {
                var authdata = Base64.encode(userEmail + ':' + id);

                $rootScope.globals = {
                    currentUser: {
                        userEmail: userEmail,
                        authdata: authdata
                    }
                };

                $http.defaults.headers.common['Authorization'] = 'Basic ' + token;
                console.log(token);
                $localStorage.token = token;
                $cookieStore.put('globals', $rootScope.globals);
            },
            clearCredentials: function () {
                $rootScope.globals = {};
                $cookieStore.remove('globals');
                $localStorage.$reset();
                $http.defaults.headers.common.Authorization = 'Basic';
            },
            test: function () {
                return $http.get('v1/apostadores', {});
            }
        };

        var Base64 = {
            keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                            this.keyStr.charAt(enc1) +
                            this.keyStr.charAt(enc2) +
                            this.keyStr.charAt(enc3) +
                            this.keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },
            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert("There were invalid base64 characters in the input text.\n" +
                            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                            "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = this.keyStr.indexOf(input.charAt(i++));
                    enc2 = this.keyStr.indexOf(input.charAt(i++));
                    enc3 = this.keyStr.indexOf(input.charAt(i++));
                    enc4 = this.keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };

        return self;
    }

})();