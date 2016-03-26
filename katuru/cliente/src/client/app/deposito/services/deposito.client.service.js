(function() {
    'use strict';

    angular
        .module('app.deposito')
        .factory('Deposito', Deposito);

    Deposito.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Deposito($resource, API_BASE_URL) {

        var params = {
            depositoId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/deposito/:depositoId';

        return $resource(API_URL, params, actions);

    }

})();
