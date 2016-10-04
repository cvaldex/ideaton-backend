angular.module('AppFace', ['facebook','ngStorage',])



    .config([
        'FacebookProvider',
        function(FacebookProvider) {
            var myAppId = '1192059834191298';

            // You can set appId with setApp method
            // FacebookProvider.setAppId('myAppId');

            /**
             * After setting appId you need to initialize the module.
             * You can pass the appId on the init method as a shortcut too.
             */
            FacebookProvider.init(myAppId);

        }
    ])

    // .run(function run($http, $cookies) {

    //     // For CSRF token compatibility with Django
    //     $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');
    // })


    .controller('LoginFaceCtrl', ['$scope', '$timeout', 'Facebook', '$http','$sessionStorage','$location' , 'envService',
        function($scope, $timeout, Facebook, $http, $sessionStorage,$location, envService) {
            var apiUrl = envService.read('apiUrl');
            // Define user empty data :/
            $scope.user = {};

            // Defining user logged status
            $scope.logged = false;

            // And some fancy flags to display messages upon user status change
            $scope.byebye = false;
            $scope.salutation = false;

            /**
             * Watch for Facebook to be ready.
             * There's also the event that could be used
             */
            $scope.$watch(
                function() {
                    return Facebook.isReady();
                },
                function(newVal) {
                    if (newVal)
                        $scope.facebookReady = true;
                }
            );

            var userIsConnected = false;

            Facebook.getLoginStatus(function(response) {
                if (response.status == 'connected') {
                    userIsConnected = true;
                }
            });

            /**
             * IntentLogin
             */
            $scope.IntentLogin = function() {
                if (!userIsConnected) {
                    $scope.login();
                }
            };

            /**
             * Login
             */
            $scope.login = function () {
                $('#login-modal').closeModal();
                Facebook.login(function (response) {
                    $('#cargando-modal').openModal();
                    if (response.status == 'connected') {
                        $scope.logged = true;
                        $scope.me();
                    }

                },{scope: 'email'});
            };

            /**
             * me
             */
            $scope.me = function () {
                Facebook.api('/me?fields=email', {fields: 'email,name,last_name,first_name'}, function (response) {

                    $scope.nombre =response.name;
                    $scope.user = response;
                    console.log(response);
                    $sessionStorage.email=response.email;
                    $sessionStorage.nombre=response.name;
                    $sessionStorage.first = response.first_name;
                    $sessionStorage.last = response.last_name;

                });
            };


            /**
             * Logout
             */
            $scope.logout = function() {
                Facebook.logout(function() {
                    $scope.$apply(function() {
                        $scope.user = {};
                        $scope.logged = false;
                    });
                });
            };

            /**
             * Taking approach of Events :D
             */
            $scope.$on('Facebook:statusChange', function(ev, data) {
                console.log('Status: ', data);

                if (data.status == 'connected') {
                    $scope.salutation = true;
                    $scope.logged = true;
                    $scope.byebye = false;
                    $scope.me();

                    $scope.obj = {
                        'access_token': data.authResponse.accessToken,
                        'code': data.authResponse.signedRequest

                    }



                    $timeout(function(){
                        console.log("sessionStorage"+$sessionStorage.email);
                        if($sessionStorage.email!=undefined){

                            //POST EN API DJANGO-------
                            $http.post(apiUrl + "/rest-auth/facebook/", $scope.obj)
                                .success(function(data, status, headers) {
                                    var nombre= $sessionStorage.nombre;
                                    $sessionStorage.token = data.key;
                                    $sessionStorage.islogin = 1;

                                    var url = $location.path();
                                    console.log(url);
                                    if (url.indexOf('/detalle-idea')!=-1) {
                                        $scope.logout();
                                        $('#cargando-modal').closeModal();
                                        $scope.idea=true;
                                    }
                                    else{
                                        $http.get(apiUrl + "/users/?email="+$sessionStorage.email)
                                            .success(function (data, status, headers) {
                                                $scope.logout();
                                                $('#cargando-modal').closeModal();
                                                if(data.results[0].commune !=""){
                                                    $scope.bandera=true;


                                                }
                                                else{
                                                    $scope.bandera=false
                                                }
                                            })
                                            .error(function (data, status, header) {
                                                console.log(data);
                                                swal({
                                                        title: "Algo salió mal!",
                                                        text: "Intenta registrarte nuevamente",
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

                                    swal({
                                            title: "Bienvenido!\n"+nombre,
                                            type: "success",
                                            confirmButtonColor: "#DD6B55",
                                            confirmButtonText: "Aceptar",
                                            closeOnConfirm: true},
                                        function(){

                                            if($scope.bandera){ $location.path("/sube-tu-idea")}
                                            if($scope.bandera ==false){ $location.path("/registrarse")}
                                            if($scope.idea ==true){location.reload();}
                                        });

                                })
                                .error(function(data, status, header) {
                                    $scope.logout();
                                    $('#cargando-modal').closeModal();
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
                            $scope.logout();
                            $('#cargando-modal').closeModal();
                            swal({
                                    title: "Algo salió mal!",
                                    text: "Verifíca tu correo de Facebook",
                                    type: "error",
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "Aceptar",
                                    closeOnConfirm: true
                                },
                                function () {
                                    location.reload();
                                });

                        }}, 1000);




                } else {
                    $scope.$apply(function() {
                        $scope.salutation = false;
                        $scope.byebye = true;

                        // Dismiss byebye message after two seconds
                        $timeout(function() {
                            $scope.byebye = false;
                            $scope.logged = false;
                        }, 2000)
                    });
                }


            });


        }
    ])

    /**
     * Just for debugging purposes.
     * Shows objects in a pretty way
     */
    .directive('debug', function() {
        return {
            restrict: 'E',
            scope: {
                expression: '=val'
            },
            template: '<pre>{{debug(expression)}}</pre>',
            link: function(scope) {
                // pretty-prints
                scope.debug = function(exp) {
                    return angular.toJson(exp, true);
                };
            }
        }
    })

;
