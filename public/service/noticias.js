angular.module('noticiasService', [])

    .config(function ($httpProvider) {
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
    })

    .factory('parseNo', function($http, envService) {

        var parseUrl = envService.read('apiUrl') + "/noticias/";

        return {
            /* Estructura de noticia
             "id": 1,
             "titulo": "Titulo 1473803769089",
             "texto_breve": "Texto Breve 1473803769089",
             "fecha": "2016-09-13",
             "descripcion": "Descripción 1473803769089",
             "imagen": "http://pyhackaton2016-hackatonteleton.rhcloud.com/media/imagenes_noticias/3ceef5ca-fdd.png",
             "video": "https://www.youtube.com/watch?v=3BBKoc5t_9M"
             */
            //Create a db object
            create: function(newData, tokenSet) {
                var jsonHeader = {headers: {'Content-Type': 'application/json', 'Authorization': tokenSet}};
                dataAdd = {
                    titulo: newData.titulo,
                    texto_breve: newData.texto_breve,
                    fecha: newData.fecha,
                    descripcion: newData.descripcion,
                    imagen: newData.imagen,
                    video: newData.video
                };
                $http.post(parseUrl, dataAdd, jsonHeader)
                    .success(function(data){
                        console.log('Noticia Agregada');
                        alert("Noticia agregada correctamente...");
                        location.reload();
                    }).error(function(data) {
                        console.log('Se ha producido un error');
                        alert("Se ha producido un error, verifique los datos...");
                });
            },
            //Update an db object, all the attributes, less the image
            updatePatch: function(newData, tokenSet) {
                var jsonHeader = {headers: {'Content-Type': 'application/json', 'Authorization': tokenSet}};
                dataUpdate = {
                    id: newData.id,
                    titulo: newData.titulo,
                    texto_breve: newData.texto_breve,
                    fecha: newData.fecha,
                    descripcion: newData.descripcion,
                    video: newData.video
                };
                $http.patch(parseUrl + dataUpdate.id + "/", dataUpdate, jsonHeader)
                    .success(function(data){
                        console.log('Noticia modificada');
                        alert("Noticia modificada correctamente...");
                        location.reload();
                    }).error(function(data) {
                        console.log('Se ha producido un error');
                        alert("Se ha producido un error, verifique los datos...");
                });
            },
            //Update an db object, all the attributes of the object
            updateFull: function(newData ,tokenSet) {
                var jsonHeader = {headers: {'Content-Type': 'application/json', 'Authorization': tokenSet}};
                dataUpdate = {
                    id: newData.id,
                    titulo: newData.titulo,
                    texto_breve: newData.texto_breve,
                    fecha: newData.fecha,
                    descripcion: newData.descripcion,
                    imagen: newData.imagen,
                    video: newData.video
                };
                $http.put(parseUrl + dataUpdate.id + "/", dataUpdate, jsonHeader)
                    .success(function(data){
                        console.log('Noticia modificada');
                        alert("Noticia modificada correctamente...");
                        location.reload();
                    }).error(function(data) {
                        console.log('Se ha producido un error');
                        alert("Se ha producido un error, verifique los datos...");
                });
            },
            //Get the fist page of the objects
            get: function() {
                global = $http.get(parseUrl + '?format=json');
                return global;
            },
            //Get the objects for the page if there's more than one
            getPage: function(page) {
                global = $http.get(parseUrl + '?page=' + page + '/?format=json');
                return global;
            },
            //Remove a db object
            remove: function(objectId ,tokenSet) {
                var jsonHeader = {headers: {'Content-Type': 'application/json', 'Authorization': tokenSet}};
                $http.delete(parseUrl + objectId + "/", jsonHeader)
                    .success(function(data){
                        console.log('Noticia eliminada for eva!');
                        alert("Noticia eliminada correctamente...");
                        location.reload();
                    }).error(function(data) {
                        console.log('Se ha producido un error');
                        alert("Se ha producido un error...");
                });
            }
        };
    });
