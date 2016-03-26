(function() {
    'use strict';

    angular
        .module('app.notaDebito')
        .factory('NotaDebito', NotaDebito);

    NotaDebito.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function NotaDebito($resource, API_BASE_URL) {

        var params = {
            notaDebitoId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/notaDebito/:notaDebitoId';

        return $resource(API_URL, params, actions);

    }

})();
