angular.module('directNoticia', [])

    .directive('tablaNoticias', function(){
        return {
            restrict: 'E',
            templateUrl: './templates/noticias/tabla.html'
        }
    })

    .directive('detallesNoticia', function(){
        return {
            restrict: 'E',
            templateUrl: './templates/noticias/detalles.html'
        }
    })

    .directive('crearNoticia', function(){
        return {
            restrict: 'E',
            templateUrl: './templates/noticias/crear.html'
        }
    })

    .directive('modificarNoticias', function(){
        return {
            restrict: 'E',
            templateUrl: './templates/noticias/modificar.html'
        }
    })

;