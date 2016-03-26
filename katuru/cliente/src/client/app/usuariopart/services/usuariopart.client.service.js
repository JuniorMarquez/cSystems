(function() {
    'use strict';

    angular
        .module('app.usuariopart')
        .factory('Usuariopart', Usuariopart);

    Usuariopart.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Usuariopart($resource, API_BASE_URL) {

        var params = {
            usuariopartId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/usuariopart/:usuariopartId';

        return $resource(API_URL, params, actions);

    }

})();
