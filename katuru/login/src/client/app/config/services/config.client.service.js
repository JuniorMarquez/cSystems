(function() {
    'use strict';

    angular
        .module('app.config')
        .factory('Config', Config);

    Config.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Config($resource, API_BASE_URL) {

        var params = {
            configId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/config/:configId';

        return $resource(API_URL, params, actions);

    }

})();
