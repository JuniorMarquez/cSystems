(function() {
    'use strict';

    angular
        .module('app.margen')
        .factory('Margen', Margen);

    Margen.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Margen($resource, API_BASE_URL) {

        var params = {
            margenId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/margen/:margenId';

        return $resource(API_URL, params, actions);

    }

})();
