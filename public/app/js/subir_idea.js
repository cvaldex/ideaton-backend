angular.module('SubirIdea', ['naif.base64','youtube-embed'])


    .controller('UpIdeaCtrl', ['$scope', '$sessionStorage', '$http','$location','envService','$anchorScroll','$timeout', function ($scope, $sessionStorage, $http,$location , envService,$anchorScroll,$timeout) {
        //validaciones
        $('input#titulo_idea, textarea#short_idea,textarea#desc_idea').characterCounter();
        /* function ytVidId(url) {
         var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
         return (url.match(p)) ? RegExp.$1 : false;
         }

         $scope.$watch($scope.url_vid,function () {
         $scope.isyoutube=ytVidId($scope.url_vid);
         console.log($scope.isyoutube);
         });*/

        $scope.autor_idea=$sessionStorage.nombre;
        $scope.mostrar=false;
        $scope.ver = function () {
            $scope.player= "video";
            if($scope.categoria ==1){$scope.categorianame='Educación'}
            if($scope.categoria ==2){$scope.categorianame='Vida diaria'}
            if($scope.categoria ==3){$scope.categorianame='Trabajo'}
            if($scope.categoria ==4){$scope.categorianame='Transporte'}
            if($scope.categoria ==5){$scope.categorianame='Comunicación'}
            if($scope.categoria ==6){$scope.categorianame='Entretención'}
            if($scope.beneficiario ==1){$scope.beneficiarioname='Visual'}
            if($scope.beneficiario ==2){$scope.beneficiarioname='Auditiva'}
            if($scope.beneficiario ==3){$scope.beneficiarioname='Cognitiva'}
            if($scope.beneficiario ==4){$scope.beneficiarioname='Física'}
            $scope.mostrar=true;
            $location.hash('vista_previa');
            $anchorScroll();
        }

        $scope.editando=function () {
            $scope.mostrar=false;
            $location.hash('');

        }

        $scope.categorias = [
            {val: '1', name: 'Educación'},
            {val: '2', name: 'Vida diaria'},
            {val: '3', name: 'Trabajo'},
            {val: '4', name: 'Transporte'},
            {val: '5', name: 'Comunicación'},
            {val: '6', name: 'Entretención'}

        ];

        $scope.beneficiarios = [
            {val: '1', name: 'Visual'},
            {val: '2', name: 'Auditiva'},
            {val: '3', name: 'Cognitiva'},
            {val: '4', name: 'Física'}
        ];


        $scope.UpIdea = function () {
            var config;


            var obj = {
                title: $scope.nombre,
                short_description: $scope.descripcion_corta,
                description: $scope.descripcion,
                url_video: $scope.url_vid,
                beneficiary: $scope.beneficiario,
                category: $scope.categoria,
                main_image: $scope.img_prin.base64

            };



            config = {
                headers: {
                    'Authorization': 'token ' + $sessionStorage.token
                }
            }

            var apiUrl = envService.read('apiUrl');

            $http.post(apiUrl + "/upload_idea/", obj, config)
                .success(function (data, status, headers, config) {

                    console.log($scope.img_2);

                    if($scope.img_2 != undefined){
                        var img2 = {
                            image: $scope.img_2.base64,
                            idea: data.id
                        };

                        $http.post(apiUrl + "/upload_image/", img2, config)
                            .success(function (data, status, headers, config) {

                            })
                            .error(function (data, status, header, config) {
                                console.log("FALLO"+data);
                            });
                    }

                    if($scope.img_3 != undefined){
                        var img3 = {
                            image: $scope.img_3.base64,
                            idea: data.id
                        };
                        $http.post(apiUrl + "/upload_image/", img3, config)
                            .success(function (data, status, headers, config) {

                            })
                            .error(function (data, status, header, config) {
                                console.log("FALLO"+data);
                            });}

                    if($scope.img_4 != undefined){
                        var img4 = {
                            image: $scope.img_4.base64,
                            idea: data.id
                        };
                        $http.post(apiUrl + "/upload_image/", img4, config)
                            .success(function (data, status, headers, config) {
                            })
                            .error(function (data, status, header, config) {
                                console.log("FALLO"+data);

                            });}

                    $timeout(function () {
                        swal({
                                title: "Idea Subida con éxito!",
                                text: "Tu Idea será moderadada, espera los resultados en las próximas horas!",
                                type: "success",
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Aceptar",
                                closeOnConfirm: true
                            },
                            function () {
                                $location.path("/inicio");
                            });
                    }, 1000);



                })
                .error(function (data, status, header, config) {
                    console.log("FALLO"+data);
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

            // setTimeout(location.reload.bind(location), 5000);


        }
    }]);
