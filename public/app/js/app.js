var app = angular.module('ideaton',['rutas','720kb.socialshare','AppFace', 'AppGoogle','validacion','registro','SubirIdea','detalle-idea','inicio','detalle-categoria','contador','detalle-noticia' , 'environment']);

app.run(function($rootScope,$sessionStorage,$state){
    $rootScope.$on('$stateChangeSuccess', function() {
      console.log("$stateChangeSuccess");
        $rootScope.islogin= false;
        if($sessionStorage.islogin == 1)
        {

            $rootScope.islogin= true;
            $rootScope.usuario = $sessionStorage.nombre;
            $rootScope.email = $sessionStorage.email;

        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    //Validar que el usuario esté logueado para mostrar las URL Protegidas
    //si $sessionStorage.islogin = 1, el user está logueado
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      var requireLogin = toState.data.requireLogin;

      if (requireLogin && $sessionStorage.islogin != 1) {
        event.preventDefault();
        $state.go('inicio'); //usuario no logueado se deber redirigr al index
      }
    });
});


app.config(function(envServiceProvider) {
        // set the domains and variables for each environment
        envServiceProvider.config({
            domains: {
                development: ['localhost'],
                testing: ['ideaton-hackatonteleton.rhcloud.com' , 'nodejs-testideaton.rhcloud.com'],
                productionNonPublic: ['front-ideaton2016.rhcloud.com'],
                productionPublic: ['www.ideaton.cl' , 'ideaton.cl']
            },
            vars: {
                development: {
                    apiUrl: 'http://pyhackaton2016-hackatonteleton.rhcloud.com'
                },
                testing: {
                    apiUrl: 'http://pyhackaton2016-hackatonteleton.rhcloud.com'
                },
                productionNonPublic: {
                    apiUrl: 'http://api-ideaton2016.rhcloud.com'
                },
                productionPublic: {
                    apiUrl: 'http://api.ideaton.cl'
                }
            }
        });

        //try to get the environment from Node.js URL
        //obtener JSON con las universidades
        // #var initInjector = angular.injector(['ng']);
        // #var $http = initInjector.get('$http');
        //
        // #$http.get('/environment')
        // #    .success(function (data, status, headers) {
        // #      console.log(data);
        // #});



        // run the environment check, so the comprobation is made
        // before controllers and services are built
        envServiceProvider.check();
    });
