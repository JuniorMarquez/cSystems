(function() {
    'use strict';

    angular
        .module('app.impuesto')
        .factory('Impuesto', Impuesto);

    Impuesto.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Impuesto($resource, API_BASE_URL) {

        var params = {
            impuestoId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/impuesto/:impuestoId';

        return $resource(API_URL, params, actions);

    }

})();
