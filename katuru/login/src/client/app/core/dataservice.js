/*(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'logger'];
    /* @ngInject */ /*
    function dataservice($http, $q, logger) {
        var service = {
            getPeople: getPeople,
            login: login
        };

        return service;


        function login(data) 
        {


        data = "hola"; 

        return vm.login.mensaje;        
        }
        

        function getPeople() {
            return $http.get('http://192.168.0.102:1337/socio')
                .then(success)
                .catch(fail);
            function success(response) {
                var msg = 'ejecutada';
                logger.success(msg);
                return response.data.results;
            }

            function fail(error) {
                var msg = 'query for people failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
       
   
    }
})();
*/