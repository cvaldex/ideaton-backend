/**
 * Created by juliogf on 23-09-16.
 */
angular.module('inicio',[])
    .controller('NoticiasCtrl', ['$scope','$http','$sessionStorage','envService', function ($scope,$http,$sessionStorage,envService) {
        var apiUrl = envService.read('apiUrl');
        $http.get(apiUrl + "/noticias/")
            .success(function (data, status, headers, config) {
                $scope.noticias = data.results;


            })
            .error(function (data, status, header, config) {
                console.log("FALLO:"+data);

            });

    }])

.controller('JuradosCtrl', ['$scope','$http','$sessionStorage','envService', function ($scope,$http,$sessionStorage,envService) {
    var apiUrl = envService.read('apiUrl');
    $http.get(apiUrl + "/jurados/")
        .success(function (data, status, headers, config) {
            $scope.jurados = data.results;


        })
        .error(function (data, status, header, config) {
            console.log("FALLO:"+data);
        });

}])
//directiva para copiar style desde master a cardcopia
.directive('master',function () { //declaration; identifier master
    function link($scope, element, attrs) { //scope we are in, element we are bound to, attrs of that element
        $scope.$watch(function(){ //watch any changes to our element
           $scope.cardcopia = { //scope variable style, shared with our controller
                height:element[0].offsetHeight+'px', //set the height in style to our elements height
                width:element[0].offsetWidth+'px' //same with width
            };
        });
    }
    return {
        restrict: 'AE', //describes how we can assign an element to our directive in this case like <div master></div
        link: link // the function to link to our element
    };
});


