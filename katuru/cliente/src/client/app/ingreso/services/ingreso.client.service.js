(function() {
    'use strict';

    angular
        .module('app.ingreso')
        .factory('Ingreso', Ingreso);

    Ingreso.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Ingreso($resource, API_BASE_URL) {

        var params = {
            ingresoId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/ingreso/:ingresoId';

        return $resource(API_URL, params, actions);

    }

})();
