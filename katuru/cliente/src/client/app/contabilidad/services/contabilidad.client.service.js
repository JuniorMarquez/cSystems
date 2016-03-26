(function() {
    'use strict';

    angular
        .module('app.contabilidad')
        .factory('Contabilidad', Contabilidad);

    Contabilidad.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Contabilidad($resource, API_BASE_URL) {

        var params = {
            contabilidadId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/contabilidad/:contabilidadId';

        return $resource(API_URL, params, actions);

    }

})();
