(function() {
    'use strict';

    angular
        .module('app.movimiento')
        .factory('Movimiento', Movimiento);

    Movimiento.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Movimiento($resource, API_BASE_URL) {

        var params = {
            movimientoId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/movimiento/:movimientoId';

        return $resource(API_URL, params, actions);

    }

})();
