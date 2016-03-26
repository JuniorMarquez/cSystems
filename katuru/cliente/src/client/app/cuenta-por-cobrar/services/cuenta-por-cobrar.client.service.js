(function() {
    'use strict';

    angular
        .module('app.cuentaPorCobrar')
        .factory('CuentaPorCobrar', CuentaPorCobrar);

    CuentaPorCobrar.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function CuentaPorCobrar($resource, API_BASE_URL) {

        var params = {
            cuentaPorCobrarId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/cuentaPorCobrar/:cuentaPorCobrarId';

        return $resource(API_URL, params, actions);

    }

})();
