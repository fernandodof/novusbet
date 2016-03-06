angular.module('novusbet.shared.validation.ValidationConfig', []).run(function (defaultErrorMessageResolver){
    defaultErrorMessageResolver.setI18nFileRootPath('bower_components/angular-auto-validate/src/lang');
    defaultErrorMessageResolver.setCulture('pt-BR');
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
          errorMessages['uniqueEmailChecker'] = 'Email já cadastrado';
    });
});