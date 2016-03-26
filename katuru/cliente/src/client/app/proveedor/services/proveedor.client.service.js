(function() {
    'use strict';

    angular
        .module('app.proveedor')
        .factory('Proveedor', Proveedor);

    Proveedor.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Proveedor($resource, API_BASE_URL) {

        var params = {
            proveedorId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/proveedor/:proveedorId';

        return $resource(API_URL, params, actions);

    }

})();
