(function() {
    'use strict';

    angular
        .module('app.sucursal')
        .factory('Sucursal', Sucursal);

    Sucursal.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Sucursal($resource, API_BASE_URL) {

        var params = {
            sucursalId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/sucursal/:sucursalId';

        return $resource(API_URL, params, actions);

    }

})();
