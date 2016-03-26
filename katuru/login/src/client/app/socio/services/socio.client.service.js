(function() {
    'use strict';

    angular
        .module('app.socio')
        .factory('Socio', Socio);

    Socio.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Socio($resource, API_BASE_URL) {

        var params = {
            socioId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/socio/:socioId';

        return $resource(API_URL, params, actions);

    }

})();
