/**
 * Created by juliogf on 23-09-16.
 */
angular.module('detalle-categoria',['rutas'])

    .controller('IdeasCtrl', ['$scope', '$sessionStorage', '$http','$stateParams' , 'envService', function ($scope, $sessionStorage, $http,$stateParams, envService) {
        var categoria = $stateParams.categoriaName;
        var ordenamiento = $stateParams.orden;
        var id_categoria;
        $scope.nombre_original_cat = $stateParams.categoriaName;

        switch(ordenamiento){
            case 'mas-votados':
                $scope.orden_categoria = '-num_vote';
                break;
            case 'recientes':
                $scope.orden_categoria = '-id';
                break;
            case 'mas-antiguos':
                $scope.orden_categoria = 'id';
                break;
        }

        switch (categoria){
            case 'educacion':
                id_categoria=1;
                $scope.nombre_cat="Educación";
                break;
            case 'vida-diaria':
                id_categoria=2;
                $scope.nombre_cat="Vida Diaria";
                break;
            case 'trabajo':
                id_categoria=3;
                $scope.nombre_cat="Trabajo";
                break;
            case 'transporte':
                id_categoria=4;
                $scope.nombre_cat="Transporte";
                break;
            case 'comunicacion':
                $scope.nombre_cat="Comunicación";
                id_categoria=5;
                break;
            case 'entretencion':
                $scope.nombre_cat="Entretención";
                id_categoria=6;
                break;
            case 'todas':
                $scope.nombre_cat="Todas";
                id_categoria=6;
                break;
        }

        var apiUrl = envService.read('apiUrl');
        $http.get(apiUrl + "/ideas/?category__id="+id_categoria+'&state=1')
            .success(function (data, status, headers, config) {
               $scope.ideas = data.results;
            })
            .error(function (data, status, header, config) {
                console.log("FALLO:"+data);
            });

        if( categoria == "todas"){
            $http.get(apiUrl + "/ideas/?state=1")
                .success(function (data, status, headers, config) {
                    $scope.ideas = data.results;
                })
                .error(function (data, status, header, config) {
                    console.log("FALLO:"+data);
                });
        }
    }]);
