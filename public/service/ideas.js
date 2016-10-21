angular.module('ideasService', [])

    .config(function ($httpProvider) {
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
    })

    .factory('parseId', function($http, envService) {

        var parseUrl = envService.read('apiUrl') + "/ideas/";
        var parseUrlPatch = envService.read('apiUrl') + "/upload_idea/";
        var parseUrlImgPat = envService.read('apiUrl') + "/upload_image/";
        var urlImages = envService.read('apiUrl') + "/imagenes/?format=json&idea=";

        return {
            /* Estructura Idea
             "id": 1,
             "title": "titulo 1111111",
             "description": "descripcion larga 1111111",
             "short_description": "descripcion corta 111111",
             "url_video": "https://www.youtube.com/watch?v=ilRSzcJfVVg",
             "num_vote": 0,
             "category": 2,
             "beneficiary": 1,
             "state": 0,
             "main_image": "http://pyhackaton2016-hackatonteleton.rhcloud.com/media/imagenes_principales/descarga.jpg",
             "user": {
                 "first_name": "Gustavo",
                 "last_name": "Gonzalez",
                 "email": "the.julio.gf@gmail.com",
                 "commune": "AYSEN",
                 "id": 37
                    }
             -----------------------------------------------------------------------------------------------------------
             Estructura Imagenes de la idea

             "id": 43,
             "idea": { "id": 15 },
             "image": "http://pyhackaton2016-hackatonteleton.rhcloud.com/media/imagenes_ideas/357ec9_lamina3.jpg"

             */
            //Get a db object of the first page
            getAll: function(){
                global = $http.get(parseUrl + '?format=json');
                return global;
            },
            //Get a db object if there are more than one page
            getPage: function(page){
                global = $http.get(parseUrl + '?page=' + page + '&format=json');
                return global;
            },
            //Get a db object based on the id of the idea
            getImgIdea: function(idIdea){
                global = $http.get(urlImages + idIdea);
                return global;
            },
            //Update all the attributes that need to be updated in a db object less the image
            updatePatch: function(newData, tokenSet) {
                var jsonHeader = {headers: {'Content-Type': 'application/json', 'Authorization': tokenSet}};
                dataUpdate = {
                    id: newData.id,
                    title: newData.title,
                    description: newData.description,
                    short_description: newData.short_description,
                    url_video : newData.url_video,
                    category: newData.category,
                    beneficiary: newData.beneficiary
                };
                $http.patch(parseUrlPatch + dataUpdate.id + "/", dataUpdate, jsonHeader)
                    .success(function(data){
                        console.log('Idea modificada');
                        alert("Idea modificada correctametne...");
                        location.reload();
                    }).error(function(data) {
                        console.log('Se ha producido un error');
                        alert("Se ha producido un error...");
                });
            },
            //Update all the attributes that need to be updated in a db object include the image
            updateFull: function(newData, tokenSet) {
                var jsonHeader = {headers: {'Content-Type': 'application/json', 'Authorization': tokenSet}};
                dataUpdate = {
                    id: newData.id,
                    title: newData.title,
                    description: newData.description,
                    short_description: newData.short_description,
                    url_video : newData.url_video,
                    category: newData.category,
                    beneficiary: newData.beneficiary,
                    main_image: newData.main_image
                };
                $http.patch(parseUrlPatch + dataUpdate.id + "/", dataUpdate, jsonHeader)
                    .success(function(data){
                        console.log('Idea modificada');
                        location.reload();
                    }).error(function(data) {
                        console.log('Se ha producido un error');
                        alert("Se ha producido un error...");
                });
            },
            updateImages: function(newData, tokenSet){
                var jsonHeader = {headers: {'Content-Type': 'application/json', 'Authorization': tokenSet}};
                dataUpdate = {
                    id: newData.id,
                    image: newData.image
                };
                $http.patch(parseUrlImgPat + dataUpdate.id + "/", dataUpdate, jsonHeader)
                    .success(function(data){
                        console.log('Imagen modificada');
                    }).error(function(data) {
                    console.log('Se ha producido un error');
                });
            },
            //Update de state so it can be published
            updateState: function (ideaId, newStat, tokenSet) {
                var jsonHeader = {headers: {'Content-Type': 'application/json', 'Authorization': tokenSet}};
                dataUpdate = {
                    id: ideaId,
                    state: newStat
                };
                $http.patch(parseUrl + dataUpdate.id + "/", dataUpdate, jsonHeader)
                    .success(function(data){
                        console.log('Idea aprobada correctamente...');
                        alert("Idea aprobada/deshabilitada correctamente...");
                        console.log('Se ha producido un error');
                    }).error(function(data) {
                        console.log('Se ha producido un error');
                        alert("Se ha producido un error...");
                });
            },
            //Remove a db object
            remove: function(objectId ,tokenSet) {
                var jsonHeader = {headers: {'Content-Type': 'application/json', 'Authorization': tokenSet}};
                $http.delete(parseUrl + objectId + "/", jsonHeader)
                    .success(function(data){
                        console.log('Idea eliminada!');
                        alert("Idea eliminada correctamente...");
                        location.reload();
                    }).error(function(data) {
                        console.log('Se ha producido un error');
                        alert("Se ha producido un error...");
                });
            }
        }
    })
;
