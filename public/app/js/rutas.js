angular.module('rutas',['ui.materialize','ui.router'])

//controladores
    .controller('inicioCtrl', ["$scope", function ($scope) {
        $scope.universidades = {
            value: "universidad 1",
            choices: ["universidad 1", "universidad 2"]
        };
        $scope.carreras = {
            value: "carrera a",
            choices: ["carrera a", "carrera b"]
        };
    }])
    .controller('detalleProyectoCtrl', function ($scope, $stateParams) {
        $scope.id = $stateParams.ideaID;
    })
    .controller('subeTuIdeaCtrl', function () {

    })
    .controller('detalleCategoriaCtrl', function () {

    })

    //vistas
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('inicio', {
                url: '/inicio',
                templateUrl: 'app/views/inicio.html',
                controller: 'inicioCtrl',
                data: {
                  requireLogin: false
                }
            })
            .state('sube-tu-idea', {
                url: '/sube-tu-idea',
                templateUrl: 'app/views/sube-tu-idea.html',
                data: {
                  requireLogin: true
                }
            })
            .state('registrarse', {
                url: '/registrarse',
                templateUrl: 'app/views/registrarse.html',
                data: {
                  requireLogin: true
                }
            })
            .state('detalle-proyecto',{
                url: '/detalle-idea/:ideaID',
                templateUrl: 'app/views/detalle-proyecto.html',
                controller: 'detalleProyectoCtrl',
                data: {
                  requireLogin: false
                }
            })
            .state('noticias',{
                url: '/noticias',
                templateUrl: 'app/views/noticias.html',
                data: {
                  requireLogin: false
                }
            })
            .state('equipo',{
                url: '/equipo',
                templateUrl: 'app/views/equipo.html',
                data: {
                    requireLogin: false
                }
            })
            .state('detalle-noticia',{
                url: '/detalle-noticia/:noticiaID',
                templateUrl: 'app/views/detalle-noticia.html',
                data: {
                  requireLogin: false
                }
            })
            .state('detalle-categoria-ordenada', {
                url: '/detalle-categoria/:categoriaName/:orden',
                templateUrl: 'app/views/ideas.html',
                controller: 'IdeasCtrl',
                data: {
                  requireLogin: false
                }
            })
            .state('bases', {
                url: '/bases',
                templateUrl: 'app/views/bases.html',
                //controller: 'IdeasCtrl',
                data: {
                  requireLogin: false
                }
            })
            .state('detalle-categoria', {
                url: '/detalle-categoria/:categoriaName',
                templateUrl: 'app/views/detalle-categoria.html',
                controller: 'IdeasCtrl',
                data: {
                  requireLogin: false
                }
            });

        $urlRouterProvider.otherwise('/inicio')
    });


var app = angular.module('App', ['circle.countdown']);
app.controller('AppController', ['$scope', function($scope){
    $scope.finished = function(){
        // Finish callback
    };
}]);
