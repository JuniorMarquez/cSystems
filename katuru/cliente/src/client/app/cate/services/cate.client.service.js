(function() {
    'use strict';

    angular
        .module('app.cate')
        .factory('Cate', Cate);

    Cate.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function Cate($resource, API_BASE_URL) {

        var params = {
            cateId: '@id'
        };

        var actions = {
            update: {
                method: 'PUT'
            }
        };

        var API_URL = API_BASE_URL + '/cate/:cateId';

        return $resource(API_URL, params, actions);

    }

})();
