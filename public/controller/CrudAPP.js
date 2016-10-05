angular.module('ngResource', []) //Modulo de carga de imagen

    .directive('ngFiles', ['$parse', function ($parse) {
        function fn_link(scope, element, attrs) {
            var onChange = $parse(attrs.ngFiles);
            element.on('change', function (event) {
                onChange(scope, { $files: event.target.files });
            });
        }

        return {
            link: fn_link
        }
    }]);

angular.module("MainApp", [
    'noticiasService',  //Fabrica de datos de noticias
    'juradoService',    //Fabrica de datos de jurados
    'ideasService',     //Fabrica de datos de ideas
    'sesionService',    //Consulta credenciales sesion
    'ngResource',
    'youtube-embed',    //Directiva de youtube para los videos
    'directNoticia',    //Directivas de modulos de noticias
    'directJurado',     //Directivas de modulos de jurados
    'directIdea',       //Directivas de modulos de ideas
    'directSesion',     //Directivas de modulos de sesion
    'ngTable',          //Libreria de ng-table para la creacion de tablas de datos de los objetos
    'environment'])     //Libreria de entornos de prueba


    .config(function(envServiceProvider) {
        // set the domains and variables for each environment
        envServiceProvider.config({
            domains: {
                development: ['localhost'],
                testing: ['backend-hackatonteleton.rhcloud.com'],
                production: ['backoffice.ideaton.cl' , 'backoffice-ideaton2016.rhcloud.com']
            },
            vars: {
                development: {
                    apiUrl: 'http://pyhackaton2016-hackatonteleton.rhcloud.com'
                },
                testing: {
                    apiUrl: 'http://pyhackaton2016-hackatonteleton.rhcloud.com'
                },
                production: {
                    apiUrl: 'http://api.ideaton.cl'
                }
            }
        });
        envServiceProvider.check();
    })

    .controller('MainCrl', function($scope, parseNo, parseJu, parseId, NgTableParams, parseLog) {

        //--------------------------------------------------------------------------------------------------------------
        // Sesion ------------------------------------------------------------------------------------------------------
        //--------------------------------------------------------------------------------------------------------------
        $scope.isLoged = sessionStorage.isLogedS;
        $scope.tokenAuth = sessionStorage.toAuth;

        function login(cred){
            parseLog.login(cred).success(function(data){
                var tk = data.key;
                $scope.isLoged = true;
                sessionStorage.isLogedS = $scope.isLoged;
                $scope.tokenAuth = "token " + tk;
                sessionStorage.toAuth = $scope.tokenAuth;
                alert("Bienvenido!...");
            }).error(function(data){
                alert("Verifique sus credenciales....");
            });
        }

        function logout(){
            $scope.isLoged = false;
            $scope.tokenAuth = "";
            sessionStorage.clear();
            alert("Desconectado correctamente...");
        }

        $scope.login = login;
        $scope.logout= logout;

        // Inicializacion de estados de tablas -------------------------------------------------------------------------

        cargarDatos();

        // Inicializacion de estados de tablas -------------------------------------------------------------------------
        $scope.noticias = [];
        $scope.jurados = [];
        $scope.ideas = [];
        $scope.paginasNoticia = 1;
        $scope.paginasJurados = 1;
        $scope.paginasIdeas = 1;
        if(sessionStorage.idTable === undefined){
            $scope.selectedOption = 'TableNo';
        }

        //----- Metodo que se llamara siempre que se quiera hacer una limpieza de variables y carga de tablas ----------

        function cargarDatos() {

            reinicioVariables();

            //Obtencion de datos de Noticias
            parseNo.get().success(function(data){
                $scope.noticias = data.results;
                $scope.paginasNoticia = Math.ceil(data.count / 100);
                if($scope.paginasNoticia < 2){
                    $scope.tableParamsNo = new NgTableParams({}, { dataset: $scope.noticias});
                }
            });

            //Si se obtiene que hay mas de una pagina, se itera en una funcion que obtiene los resultados de cada pagina
            if($scope.paginasNoticia > 1){
                for(var n = 2; n <= $scope.paginasNoticia; n++){
                    parseNo.getPage(n).success(function(data){
                        for(var g = 0; g < data.results.length; g++){
                            $scope.noticias.push(data.results[g]);
                        }
                        $scope.tableParamsNo = new NgTableParams({}, { dataset: $scope.noticias});
                    })
                }
            }

            //Obtencion de datos de Jurados
            parseJu.get().success(function(data){
                $scope.jurados = data.results;
                $scope.paginasJurados = Math.ceil(data.count / 100);
                if($scope.paginasJurados < 2){
                    $scope.tableParamsJu = new NgTableParams({}, { dataset: $scope.jurados});
                }
            });

            //Si se obtiene que hay mas de una pagina, se itera en una funcion que obtiene los resultados de cada pagina
            if($scope.paginasJurados > 1){
                for(var j = 2; j <= $scope.paginasNoticia; j++){
                    parseJu.getPage(j).success(function(data){
                        for(var v = 0; v < data.results.length; v++){
                            $scope.jurados.push(data.results[v]);
                        }
                        $scope.tableParamsJu = new NgTableParams({}, { dataset: $scope.jurados});
                    });
                }
            }

            //Obtencion de datos de Ideas
            parseId.getAll().success(function(data){
                $scope.ideas = data.results;
                $scope.paginasIdeas = Math.ceil(data.count / 100);
                if($scope.paginasIdeas < 2){
                    $scope.tableParamsId = new NgTableParams({}, { dataset: $scope.ideas});
                }
            });

            //Si se obtiene que hay mas de una pagina, se itera en una funcion que obtiene los resultados de cada pagina
            if($scope.paginasIdeas > 1){
                for(var i = 2; i <= $scope.paginasIdeas; i++){
                    parseId.getPage(i).success(function(data){
                        for(var l = 0; l < data.results.length; l++){
                            $scope.ideas.push(data.results[l]);
                        }
                        $scope.tableParamsId = new NgTableParams({}, { dataset: $scope.ideas});
                    });
                }
            }

        }

        /*
        Reinicia todos los datos a default, estos datos son utilizados en los metodos mas adelante,
         asi se tienen formularios limpios, se decidio dejar por separado para poder diferenciar de
         la carga de datos a las tablas
        */

        function reinicioVariables(){
            //Se marcara con distintas opciones para mostrar los distintos formularios, null es la tabla de noticias por defecto
            $scope.selectedOption = sessionStorage.idTable;
            $scope.imageCounter = 0;
            $scope.needimage = false;
            $scope.currentNoticia = [];
            $scope.newNoticia = [];
            $scope.updNoticia = [];
            $scope.currentJurado = [];
            $scope.newJurado = [];
            $scope.currentIdea = [];
            $scope.currentImgsIdea = [];
            $scope.ideaTemp = [];
            $scope.imagesrc = [];
        }

        //--------------------------------------------------------------------------------------------------------------
        $scope.cargarDatos = cargarDatos;

        //--------------------------------------------------------------------------------------------------------------
        // Controladores de estado -------------------------------------------------------------------------------------
        //--------------------------------------------------------------------------------------------------------------

        //-- Estados de formularios de Noticias ------------------------------------------------------------------------
        function mostrarDetalleNoticia(noticia){
            cargarDatos();
            $scope.currentNoticia = noticia;
            $scope.selectedOption = 'N';
        }

        function mostrarNewNoticia(){
            cargarDatos();
            $scope.selectedOption = 'AddN';
        }

        function mostrarUpdNoticia(noticia){
            cargarDatos();
            $scope.updNoticia = angular.copy(noticia);
            $scope.selectedOption = "UpdN";
        }

        function mostrarDelNoticia(noticia) {
            cargarDatos();
            $scope.currentNoticia = noticia;
            $scope.selectedOption = 'DelN';
        }

        //-- Estados de formularios de Jurados -------------------------------------------------------------------------
        function mostrarTablaJurados(){
            sessionStorage.idTable = 'TableJ';
            cargarDatos();
        }

        function mostrarDetalleJurado(jurado){
            cargarDatos();
            $scope.currentJurado = jurado;
            $scope.selectedOption = 'J';
        }

        function mostrarNewJurado(){
            cargarDatos();
            $scope.selectedOption = 'AddJ';
        }

        function mostrarUpdJurado(jurado){
            cargarDatos();
            $scope.currentJurado = angular.copy(jurado);
            $scope.selectedOption = "UpdJ";
        }

        function mostrarDelJurado(jurado){
            cargarDatos();
            $scope.currentJurado = jurado;
            $scope.selectedOption = "DelJ";
        }

        //-- Estados de formularios de Ideas ---------------------------------------------------------------------------
        function mostrarTablaIdeas(){
            sessionStorage.idTable = 'TableId';
            cargarDatos();
        }

        function mostrarDetalleIdea(idea){
            cargarDatos();
            $scope.selectedOption = 'I';
            $scope.currentIdea = idea;
            detallesidea(idea);
            parseId.getImgIdea(idea.id).success(function (data){
                $scope.currentImgsIdea = data.results;
            });
        }

        function mostrarDetalleAprobBaja(idea){
            cargarDatos();
            $scope.selectedOption = 'upId';
            $scope.currentIdea = idea;
            detallesidea(idea);
            parseId.getImgIdea(idea.id).success(function (data){
                $scope.currentImgsIdea = data.results;
            });
        }

        function mostrarUpdIdea(idea){
            cargarDatos();
            $scope.currentIdea = angular.copy(idea);
            detallesidea(idea);
            parseId.getImgIdea(idea.id).success(function (data){
                $scope.currentImgsIdea = data.results;
            });
            $scope.selectedOption = "UpdI";
        }

        //-- Transformacion de id de categoria, estado y beneficiado a texto en una variable temporal ------------------
        function detallesidea(idea){
            $scope.ideaTemp.idBenef = idea.beneficiary;
            $scope.ideaTemp.idCat = idea.category;
            $scope.ideaTemp.benef = textBenef(idea.beneficiary);
            $scope.ideaTemp.categoria = textCategory(idea.category);
            $scope.ideaTemp.stat = textState(idea.state);
        }

        function textState(id){
            switch (id){
                case 0:
                    return 'Sin aprobar';
                    break;
                case 1:
                    return 'Aprobada';
                    break;
            }
        }

        function textCategory(id){
            switch (id){
                case 1:
                    return 'Educacion';
                    break;
                case 2:
                    return 'Vida diaria';
                    break;
                case 3:
                    return 'Trabajo';
                    break;
                case 4:
                    return 'Transporte';
                    break;
                case 5:
                    return 'Comunicacion';
                    break;
                case 6:
                    return 'Entretencion';
                    break;
            }
        }

        function textBenef(id){
            switch (id){
                case 1:
                    return 'Visual';
                    break;
                case 2:
                    return 'Auditiva';
                    break;
                case 3:
                    return 'Cognitiva';
                    break;
                case 4:
                    return 'Fisica';
                    break;
            }
        }

        //-- Inicializacion de funciones de manera publica -------------------------------------------------------------

        $scope.mostrarDetalleNoticia = mostrarDetalleNoticia;
        $scope.mostrarNewNoticia = mostrarNewNoticia;
        $scope.mostrarUpdNoticia = mostrarUpdNoticia;
        $scope.mostrarDelNoticia = mostrarDelNoticia;
        //--------------------------------------------------------------------------------------------------------------
        $scope.mostrarTablaJurados = mostrarTablaJurados;
        $scope.mostrarDetalleJurado = mostrarDetalleJurado;
        $scope.mostrarNewJurado = mostrarNewJurado;
        $scope.mostrarUpdJurado = mostrarUpdJurado;
        $scope.mostrarDelJurado = mostrarDelJurado;
        //--------------------------------------------------------------------------------------------------------------
        $scope.mostrarTablaIdeas = mostrarTablaIdeas;
        $scope.mostrarDetalleIdea = mostrarDetalleIdea;
        $scope.mostrarDetalleAprobBaja = mostrarDetalleAprobBaja;
        $scope.mostrarUpdIdea = mostrarUpdIdea;
        $scope.delIdea = delIdea;
        $scope.textBenef = textBenef;

        //--------------------------------------------------------------------------------------------------------------
        // CRUD --------------------------------------------------------------------------------------------------------
        //--------------------------------------------------------------------------------------------------------------

        function cancelarCrear(){
            sessionStorage.idTable = 'TableNo';
            cargarDatos();
        }

        //-- Seccion Noticias ------------------------------------------------------------------------------------------

        function createNewNoticia(noticia){
            if ($scope.imageCounter < 1){
                $scope.needimage = true;
            }else {
                var date = new Date(); //Se inisializa la variable Date para obtener la fecha actual, de esta manera se almacena como string
                noticia.fecha = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
                noticia.imagen = $scope.imagesrc[0].src.split(",")[1]; //Llamada a la imagen seleccionada
                parseNo.create(noticia, $scope.tokenAuth);
            }
        }

        function updateNoticia(noticia){
            if ($scope.imageCounter < 1){
                parseNo.updatePatch(noticia, $scope.tokenAuth);
            }else {
                noticia.imagen = $scope.imagesrc[0].src.split(",")[1];
                parseNo.updateFull(noticia, $scope.tokenAuth);
            }
        }

        function delNoticia(noticia){
              parseNo.remove(noticia, $scope.tokenAuth);
        }

        //--- Seccion jurados ------------------------------------------------------------------------------------------

        function createNewJurado(jurado){
            if ($scope.imageCounter < 1){
                $scope.needimage = true;
            }else {
                jurado.imagen = $scope.imagesrc[0].src.split(",")[1];
                parseJu.create(jurado, $scope.tokenAuth);
                mostrarTablaJurados();
            }
        }

        function updateJurado(jurado){
            if ($scope.imageCounter < 1){
                parseJu.updatePatch(jurado, $scope.tokenAuth);
                mostrarTablaJurados();
            }else {
                jurado.imagen = $scope.imagesrc[0].src.split(",")[1];
                parseJu.updateFull(jurado, $scope.tokenAuth);
                mostrarTablaJurados();
            }
        }

        function delJurado(idJurado){
            parseJu.remove(idJurado, $scope.tokenAuth);
            mostrarTablaJurados();
        }

        function delIdea(idea){
          if (confirm('¿Seguro que deseas eliminar la Idea? ' + idea.title )) {
            console.log(idea);
              parseId.remove(idea.id, $scope.tokenAuth);
            } else {
              // Do nothing!
            }

            mostrarTablaIdeas();
        }

        //--- Seccion ideas --------------------------------------------------------------------------------------------

        function aprobBajaIdea(idIDea, currentState){
            if(currentState === 0 ){
                parseId.updateState(idIDea, 1, $scope.tokenAuth);
                mostrarTablaIdeas();
            }else{
                parseId.updateState(idIDea, 0, $scope.tokenAuth);
                mostrarTablaIdeas();
            }
        }

        function updateIdea(idea, ideaTemp){
            if ($scope.imageCounter < 1){
                idea = cats(idea, ideaTemp);
                parseId.updatePatch(idea, $scope.tokenAuth);
                mostrarTablaIdeas();
            }else {
                idea = cats(idea, ideaTemp);
                for(var i = 0; i < $scope.imagesrc.length; i++) {
                    var img = {};
                    img.id = $scope.imagesrc[i].id;
                    if(img.id !== 0) {
                        img.image = $scope.imagesrc[i].src.split(",")[1];
                        parseId.updateImages(img, $scope.tokenAuth);
                    }else{
                        idea.main_image = $scope.imagesrc[i].src.split(",")[1];
                        parseId.updateFull(idea, $scope.tokenAuth);
                    }
                }
                mostrarTablaIdeas();
                alert("Idea modificada correctametne...");
            }
        }

        function cats(idea, ideaTemp){
            if(ideaTemp.idCat !== ''){
                idea.category = parseInt(ideaTemp.idCat);
            }
            if(ideaTemp.idBenef !== ''){
                idea.beneficiary = parseInt(ideaTemp.idBenef);
            }
            return idea;
        }

        //Inicializacion de funciones de manera publica ----------------------------------------------------------------
        $scope.cancelarCrear = cancelarCrear;
        $scope.updateNoticia = updateNoticia;
        $scope.createNewNoticia = createNewNoticia;
        $scope.delNoticia = delNoticia;
        //--------------------------------------------------------------------------------------------------------------
        $scope.updateJurado = updateJurado;
        $scope.createNewJurado = createNewJurado;
        $scope.delJurado = delJurado;
        //--------------------------------------------------------------------------------------------------------------
        $scope.aprobBajaIdea = aprobBajaIdea;
        $scope.updateIdea = updateIdea;


        //--------------------------------------------------------------------------------------------------------------
        // Obtencion de la imagen seleccionada -------------------------------------------------------------------------
        //--------------------------------------------------------------------------------------------------------------

        var itemFormData = new FormData();

        $scope.getTheFiles = function ($files, idImg) {

            for (var i = 0; i < $files.length; i++) {
                var reader = new FileReader();
                reader.fileName = $files[i].name;

                reader.onload = function (event) {
                    var image = {};
                    image.id = idImg;
                    image.name = event.target.fileName;
                    image.size = (event.total / 1024).toFixed(2);
                    image.src = event.target.result;
                    $scope.imagesrc.push(image);
                    $scope.$apply();
                };
                reader.readAsDataURL($files[i]);
            }
        };

        $scope.addItemImage = function ($files, idImg) {
            $scope.getTheFiles($files, idImg);

            angular.forEach($files, function (value, key) {
                itemFormData.append(key, value);
            });

            $scope.imageCounter += 1; //contador para validar que haya una imagen al menos
        }

    })

;
