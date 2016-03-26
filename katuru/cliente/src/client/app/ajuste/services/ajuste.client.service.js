(function() {
    'use strict';

    angular
        .module('app.ajuste')
        .factory('Ajuste', Ajuste);

    Ajuste.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Ajuste($resource, API_BASE_URL) {

        var params = {
            ajusteId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/ajuste/:ajusteId';

        return $resource(API_URL, params, actions);

    }

})();
