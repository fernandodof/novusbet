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
        }
    };
    
    return self;
});