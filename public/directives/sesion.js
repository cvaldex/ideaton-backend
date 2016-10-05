angular.module('directSesion', [])

    .directive('loginSesion', function(){
        return {
            restrict: 'E',
            templateUrl: './templates/sesion/login.html'
        }
    })
;