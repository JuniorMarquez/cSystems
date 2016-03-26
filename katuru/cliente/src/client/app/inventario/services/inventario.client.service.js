(function() {
    'use strict';

    angular
        .module('app.inventario')
        .factory('Inventario', Inventario);

    Inventario.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Inventario($resource, API_BASE_URL) {

        var params = {
            inventarioId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/inventario/:inventarioId';

        return $resource(API_URL, params, actions);

    }

})();
