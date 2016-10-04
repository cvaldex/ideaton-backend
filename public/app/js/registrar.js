angular.module('registro',['ngStorage','oitozero.ngSweetAlert'])
    .controller('RegistroCtrl', ['$scope','$sessionStorage','$timeout','$http','envService', function ($scope,$sessionStorage,$timeout, $http, envService) {
        var apiUrl = envService.read('apiUrl');
        $scope.checkboxU = {
            ischeck : false
        };
        $scope.nombre=$sessionStorage.first;
        $scope.apellido=$sessionStorage.last;

        //ejecutar este metodo una vez que la pagina se cargue completa
        angular.element(document).ready(function() {
            //obtener JSON con las comunas
            $http.get('app/js/static-json/comunas.json')
                .success(function (data, status, headers) {
                  $scope.comunas = data;
            });

            //obtener JSON con las universidades
            $http.get('app/js/static-json/universidades.json')
                .success(function (data, status, headers) {
                  $scope.universitys = data;
            });

            //obtener JSON con las carreras
            $http.get('app/js/static-json/carreras.json')
                .success(function (data, status, headers) {
                  $scope.carrers = data;
            });
        });

        $scope.UpdateUser = function ($location) {

            var fecha = $scope.edad.split("-");
            dia = fecha[0];
            mes = fecha[1];
            año = fecha[2];
             var age =año+"-"+mes+"-"+dia;
            var obj = {
                first_name: $scope.nombre,
                last_name: $scope.apellido,
                phone: $scope.telefono,
                age: age,
                commune: $scope.comuna,
                is_student:$scope.checkboxU.ischeck,
                career:$scope.carrera,
                university:$scope.universidad
            };



            console.log(obj.age);
            if($sessionStorage.islogin === 1)
            {
                var config = {
                    headers : {
                        'Authorization': 'token '+$sessionStorage.token
                    }
                };
                $http.get(apiUrl + "/users/?email="+$sessionStorage.email)
                    .success(function (data, status, headers) {
                        $scope.id= data.results[0].id;
                        $http.patch(apiUrl + "/editusers/"+ $scope.id+'/',obj,config)
                            .success(function (data, status, headers,config) {
                                $sessionStorage.isreg=1;
                                swal({
                                        title: "Datos Registrados\n"+$sessionStorage.nombre,
                                        type: "success",
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "Subir Idea",
                                        closeOnConfirm: true},
                                    function(){

                                        location.href = '/#/sube-tu-idea';
                                    });


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

                    })
                    .error(function (data, status, header) {
                        console.log("FALLO"+data);
                    });



            }

            // setTimeout(location.reload.bind(location), 5000);
        };

        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 100, // Creates a dropdown of 15 years to control year
            monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthsShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            weekdaysLetter: ['D', 'L', 'M', 'MI', 'J', 'V', 'S'],
            today: 'hoy',
            clear: 'borrar',
            close: 'cerrar',
            firstDay: 1,
            format: 'dd!-mm!-yyyy',
            formatSubmit: 'dd-mm-yyyy'
        });
    }]);
