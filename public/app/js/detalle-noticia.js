/**
 * Created by juliogf on 25-09-16.
 */
angular.module('detalle-noticia',[])

.controller('NoticiaCtrl',['$scope','$location','$http','$stateParams', 'envService', function ($scope,$location,$http,$stateParams , envService) {
    var apiUrl = envService.read('apiUrl');

    var id_noticia = $stateParams.noticiaID;
    $http.get(apiUrl + "/noticias/"+id_noticia+"/")
        .success(function (data, status, headers, config) {
            $scope.noticia= data;
            $scope.descripcion_noticia=data.descripcion.replace(/\n/g, "<br>");



        })
        .error(function (data, status, header, config) {
            console.log("FALLO:"+data);
            swal({
                    title: "Algo salió mal!",
                    text: "Intentalo de nuevo!",
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Aceptar",
                    closeOnConfirm: true
                },
                function () {
                    location.reload();
                });
        });

}]);
