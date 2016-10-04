angular.module('AppGoogle', ['google-signin', 'ngStorage','rutas','oitozero.ngSweetAlert',])

    .config(['GoogleSigninProvider',
        function (GoogleSigninProvider) {
            GoogleSigninProvider.init({
                client_id: '967523360840-74o0m867ttit62dal7ivklnjc3ore6gf.apps.googleusercontent.com',
            });
        }
    ])

    .controller('LoginGoogleCtrl', ['$scope', 'GoogleSignin', '$http', '$sessionStorage','$rootScope','$location','$state','envService',

        function ($scope, GoogleSignin, $http, $sessionStorage,$rootScope,$location,$state, envService) {
            //var apiUrl = envService.read('apiUrl');
            $scope.googleLogin = function () {

                GoogleSignin.signIn().then(function (user) {
                        console.log(user);
                        $('#login-modal').closeModal();
                        $('#cargando-modal').openModal();
                        $scope.nombreuser =user.w3.ig;
                        $sessionStorage.nombre = user.w3.ig;
                        $sessionStorage.email = user.w3.U3;
                        $sessionStorage.first = user.w3.ofa;
                        $sessionStorage.last = user.w3.wea;
                       // var password = Math.random().toString(36).slice(-8);
                        $scope.password = "Default123456";
                        console.log($scope.password);
                        var obj = {

                            'email': user.w3.U3,
                            'password1': $scope.password,
                            'password2': $scope.password

                        }

                        var apiUrl = envService.read('apiUrl');

                        $http.post(apiUrl + "/rest-auth/registration/", obj)
                            .success(function (data, status, headers) {
                                $sessionStorage.token = data.key;
                                $sessionStorage.islogin = 1;

                                $('#cargando-modal').closeModal();
                                swal({
                                        title: "Bienvenido!\n"+$scope.nombreuser,
                                        type: "success",
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "Aceptar",
                                        closeOnConfirm: true},
                                    function(){
                                            $sessionStorage.isreg=0;
                                        var url = $location.path();
                                        console.log(url);
                                        if (url.indexOf('/detalle-idea')!=-1) { $http.get(apiUrl + "/users/?email="+$sessionStorage.email)
                                            .success(function (data, status, headers) {
                                                if(data.results[0].commune !=""){
                                                    $sessionStorage.isreg=1;
                                                    console.log("sube");
                                                    $('#cargando-modal').closeModal();
                                                    swal({
                                                            title: "Bienvenido!\n"+$scope.nombreuser,
                                                            type: "success",
                                                            confirmButtonColor: "#DD6B55",
                                                            confirmButtonText: "Aceptar",
                                                            closeOnConfirm: true},
                                                        function(){
                                                            location.reload();
                                                            // $state.go('sube-tu-idea');
                                                            //$location.path("/sube-tu-idea");

                                                        });

                                                }
                                                else{
                                                    $sessionStorage.isreg=0;
                                                    console.log("REG");
                                                    $('#cargando-modal').closeModal();
                                                    swal({
                                                            title: "Bienvenido!\n"+$scope.nombreuser,
                                                            type: "success",
                                                            confirmButtonColor: "#DD6B55",
                                                            confirmButtonText: "Aceptar",
                                                            closeOnConfirm: true},
                                                        function(){
                                                            location.reload();
                                                            //$state.go('registrarse');
                                                            //$location.path("/registrarse");

                                                        });
                                                }
                                            })
                                            .error(function (data, status, header) {
                                                console.log(data);
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
                                        }
                                        else{
                                             $location.path("/registrarse");
                                            }
                                    });

                            })
                            .error(function (data, status, headers) {

                                var obj2 = {
                                    'email': user.w3.U3,
                                    'password': $scope.password
                                }
                                console.log(obj2);

                                $http.post(apiUrl + "/rest-auth/login/", obj2)
                                    .success(function (data, status, headers, config) {
                                        $sessionStorage.token = data.key;
                                        $sessionStorage.islogin = 1;
                                        var url = $location.path();
                                        if (url.indexOf('/detalle-idea')!=-1) {
                                            $http.get(apiUrl + "/users/?email="+$sessionStorage.email)
                                                .success(function (data, status, headers) {
                                                    if(data.results[0].commune !=""){
                                                        $sessionStorage.isreg=1;
                                                        console.log("sube");
                                                        $('#cargando-modal').closeModal();
                                                        swal({
                                                                title: "Bienvenido!\n"+$scope.nombreuser,
                                                                type: "success",
                                                                confirmButtonColor: "#DD6B55",
                                                                confirmButtonText: "Aceptar",
                                                                closeOnConfirm: true},
                                                            function(){
                                                                location.reload();
                                                                // $state.go('sube-tu-idea');
                                                                //$location.path("/sube-tu-idea");

                                                            });

                                                    }
                                                    else{
                                                        $sessionStorage.isreg=0;
                                                        console.log("REG");
                                                        $('#cargando-modal').closeModal();
                                                        swal({
                                                                title: "Bienvenido!\n"+$scope.nombreuser,
                                                                type: "success",
                                                                confirmButtonColor: "#DD6B55",
                                                                confirmButtonText: "Aceptar",
                                                                closeOnConfirm: true},
                                                            function(){
                                                                location.reload();
                                                                //$state.go('registrarse');
                                                                //$location.path("/registrarse");

                                                            });
                                                    }
                                                })
                                                .error(function (data, status, header) {
                                                    console.log(data);
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

                                        }
                                        else{
                                            $http.get(apiUrl + "/users/?email="+$sessionStorage.email)
                                                .success(function (data, status, headers) {
                                                    if(data.results[0].commune !=""){
                                                        $sessionStorage.isreg=1;
                                                        console.log("sube");
                                                        $('#cargando-modal').closeModal();
                                                        swal({
                                                                title: "Bienvenido!\n"+$scope.nombreuser,
                                                                type: "success",
                                                                confirmButtonColor: "#DD6B55",
                                                                confirmButtonText: "Aceptar",
                                                                closeOnConfirm: true},
                                                            function(){
                                                                $state.go('sube-tu-idea', {}, {reload: true});
                                                               // $state.go('sube-tu-idea');
                                                               //$location.path("/sube-tu-idea");

                                                            });

                                                    }
                                                    else{
                                                        $sessionStorage.isreg=0;
                                                        console.log("REG");
                                                        $('#cargando-modal').closeModal();
                                                        swal({
                                                                title: "Bienvenido!\n"+$scope.nombreuser,
                                                                type: "success",
                                                                confirmButtonColor: "#DD6B55",
                                                                confirmButtonText: "Aceptar",
                                                                closeOnConfirm: true},
                                                            function(){
                                                                $state.go('registrarse', {}, {reload: true});
                                                                //$state.go('registrarse');
                                                                //$location.path("/registrarse");

                                                            });
                                                    }
                                                })
                                                .error(function (data, status, header) {
                                                    console.log(data);
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

                                                                }




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

                            });


                    },
                    function (err) {
                        console.log(err);
                    });

            };

        }
    ]);
