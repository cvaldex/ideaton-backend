angular.module('juradoService', [  ])

    .config(function ($httpProvider) {
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
    })

    .factory('parseJu', function($http, envService) {

        var parseUrl = envService.read('apiUrl') + "/jurados/";

        return {
            /* Estructura del jurado
             "id": 4,
             "nombre": "jurado",
             "cargo": "fdfgdfg",
             "presentacion": "dfgdfgdfsffdgsdf",
             "imagen": "http://pyhackaton2016-hackatonteleton.rhcloud.com/media/imagenes_jurados/me.jpg"
             */
            //Create a db object on server
            create: function(newData, tokenSet) {
                var jsonHeader = {headers: {'Content-Type': 'application/json', 'Authorization': tokenSet}};
                dataAdd = {
                    nombre: newData.nombre,
                    cargo: newData.cargo,
                    presentacion: newData.presentacion,
                    imagen: newData.imagen
                };
                $http.post(parseUrl, dataAdd, jsonHeader)
                    .success(function(data){
                        console.log('Jurado Agregado');
                        alert("Jurado agregado correctamente...");
                        location.reload();
                    }).error(function(data) {
                        console.log('Se ha producido un error');
                        alert("Se ha producido un error, verifique los datos...");
                });
            },
            //Update a db object, the atributtes that need to be updated
            updatePatch: function(newData, tokenSet) {
                var jsonHeader = {headers: {'Content-Type': 'application/json', 'Authorization': tokenSet}};
                dataUpdate = {
                    id: newData.id,
                    nombre: newData.nombre,
                    cargo: newData.cargo,
                    presentacion: newData.presentacion
                };
                $http.patch(parseUrl + dataUpdate.id + "/", dataUpdate, jsonHeader)
                    .success(function(data){
                        console.log('Jurado modificado');
                        alert("Jurado modificado correctamente...");
                        location.reload();
                    }).error(function(data) {
                        console.log('Se ha producido un error');
                        alert("Se ha producido un error, verifique los datos...");
                });
            },
            //Update all the attributes of the object
            updateFull: function(newData, tokenSet) {
                var jsonHeader = {headers: {'Content-Type': 'application/json', 'Authorization': tokenSet}};
                dataUpdate = {
                    id: newData.id,
                    nombre: newData.nombre,
                    cargo: newData.cargo,
                    presentacion: newData.presentacion,
                    imagen: newData.imagen
                };
                $http.put(parseUrl + dataUpdate.id + "/", dataUpdate, jsonHeader)
                    .success(function(data){
                        console.log('Jurado modificado');
                        alert("Jurado modificado correctamente...");
                        location.reload();
                    }).error(function(data) {
                        console.log('Se ha producido un error');
                        alert("Se ha producido un error, verifique los datos...");
                });
            },
            //Get the objects of hte first page
            get: function() {
                global = $http.get(parseUrl + '?format=json');
                return global;
            },
            //Get the objects of the page if there's more than one
            getPage: function(page) {
                global = $http.get(parseUrl + '?page=' + page + '&format=json');
                return global;
            },
            //Remove a db object
            remove: function(objectId, tokenSet) {
                var jsonHeader = {headers: {'Content-Type': 'application/json', 'Authorization': tokenSet}};
                $http.delete(parseUrl + objectId + '/', jsonHeader)
                    .success(function(data){
                        console.log('Jurado eliminado for eva!');
                        alert("Jurado eliminado correctamente...");
                        location.reload();
                    }).error(function(data) {
                        console.log('Se ha producido un error');
                        alert("Se ha producido un error...");
                });
            }
        };
    });
