angular.module('directIdea', [])

    .directive('tablaIdeas', function(){
        return {
            restrict: 'E',
            templateUrl: './templates/ideas/tabla.html'
        }
    })

    .directive('detallesIdeas', function(){
        return {
            restrict: 'E',
            templateUrl: './templates/ideas/detalles.html'
        }
    })

    .directive('modificarIdea', function(){
        return {
            restrict: 'E',
            templateUrl: './templates/ideas/modificar.html'
        }
    })
;