(function() {
    'use strict';

    angular
        .module('app.cliente')
        .factory('Cliente', Cliente);

    Cliente.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Cliente($resource, API_BASE_URL) {

        var params = {
            clienteId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/cliente/:clienteId';

        return $resource(API_URL, params, actions);

    }

})();
