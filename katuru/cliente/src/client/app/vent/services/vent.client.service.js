(function() {
    'use strict';

    angular
        .module('app.vent')
        .factory('Vent', Vent);
/*.factory('Entrada', Entrada);

    Entrada.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
  /*  function Entrada($resource, API_BASE_URL) {

        var params = {
            entradaId: '@id'
        };

        var actions = {
            updateEntrada: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/entrada/:entradaId';

        return $resource(API_URL, params, actions);

    }


*/
        

    Vent.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Vent($resource, API_BASE_URL) {

        var params = {
            ventId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/vent/:ventId';

        return $resource(API_URL, params, actions);

    }

})();
