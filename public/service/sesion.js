angular.module("sesionService", [])

    .config(function ($httpProvider) {
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.common.Accept = '*/*';
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
    })

    .factory('parseLog', function($http, envService) {

        var parseUrl = envService.read('apiUrl') + "/rest-auth/login/";
        var jsonHeader = {headers: {'Content-Type': 'application/json'}};

        return {
            login: function(credentials) {
                dataSet = {
                    email: credentials.email,
                    password: credentials.password
                };
                global = $http.post(parseUrl, dataSet, jsonHeader);
                return global;
            }
        }
    })
;