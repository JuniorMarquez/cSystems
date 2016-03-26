(function() {
    'use strict';

    angular
        .module('app.articulo')
        .factory('Articulo', Articulo);

    Articulo.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Articulo($resource, API_BASE_URL) {

        var params = {
            articuloId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/articulo/:articuloId';

        return $resource(API_URL, params, actions);

    }

})();
