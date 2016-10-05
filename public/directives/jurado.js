angular.module('directJurado', [])

    .directive('tablaDatosJurado', function(){
        return {
            restrict: 'E',
            templateUrl: './templates/jurado/tabla.html'
        }
    })

    .directive('detallesJurado', function(){
        return {
            restrict: 'E',
            templateUrl: './templates/jurado/detalles.html'
        }
    })

    .directive('crearJurado', function(){
        return {
            restrict: 'E',
            templateUrl: './templates/jurado/crear.html'
        }
    })

    .directive('modificarJurado', function(){
        return {
            restrict: 'E',
            templateUrl: './templates/jurado/modificar.html'
        }
    })
;