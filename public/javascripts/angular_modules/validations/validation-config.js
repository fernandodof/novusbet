angular.module('novusbet.validation.ValidationConfig', []).run(function (defaultErrorMessageResolver){
    defaultErrorMessageResolver.setI18nFileRootPath('bower_components/angular-auto-validate/src/lang');
    defaultErrorMessageResolver.setCulture('pt-BR');
});