angular.module('novusbet.services.auth.AuthService',[]).service('AuthService', function ($http){
    var self = {
        signUp: function(email, password){
            return $http.post('/signup', {
                email: email,
                password: password
            });
        },
        logout: function (){
            return $http.get('logout', {});
        },
        checkEmail: function(email){
            return $http.get('apostadores/email/' + email, {});
        },
        login: function(email, password){
            return $http.post('login', {
                email: email,
                password: password
            });
        },
        test:function(){
            return $http.get('http://192.168.25.179:8080/tcc-services/rest/georef/arquivos', {});
        }
    };
    
    return self;
});