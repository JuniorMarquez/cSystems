/* jshint ignore:start */

(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('focus', function($timeout, $window) {
    return function(id) {
      // timeout makes sure that is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.focus();
      });
    };
  })
        .factory('TableSettings', factory);

    factory.$inject = ['ngTableParams'];
    /* @ngInject */
    function factory(ngTableParams) {

        var previousEntity;

        var getData = function(Entity) {
            return function($defer, params) {

                var requestParams = convertToServerRequestParams(params.$params);

                if (previousEntity !== Entity) {
                    previousEntity = Entity;
                    tableParams.$params.filter = {};
                }

                Entity.get(requestParams, function(response) {
                    params.total(response.total);
                    $defer.resolve(response.results);
                });
            };
        };

        var params = {
            page: 1,
            count: 10
        };

        var settings = {
            total: 0,
            counts: [10, 20, 30],
            filterDelay: 0
        };

        var tableParams = new ngTableParams(params, settings);

        var getParams = function(Entity) {
            tableParams.settings({getData: getData(Entity)});
            return tableParams;
        };

        var service = {
            getParams: getParams
        };

        return service;

    }

    function convertToServerRequestParams(tableParams) {
        var serverParams = {};
        var filterServerParams = getFilterServerParams(tableParams);
        var keySort = Object.keys(tableParams.sorting)[0];

        if (filterServerParams) {
            serverParams.where = filterServerParams;
        };

        if (keySort) {
            serverParams.sort = keySort + ' ' + tableParams.sorting[keySort];
        };

        serverParams.limit = tableParams.count;
        serverParams.skip = (tableParams.page - 1) * tableParams.count;

        return serverParams;
    }

    function getFilterServerParams(tableParams) {
        var tableFilters = tableParams.filter;
        var tableFiltersNumber = Object.keys(tableFilters).length;
        var filterServerParams;

        if (tableFiltersNumber === 1) {
            var key = Object.keys(tableFilters)[0];
            filterServerParams = getFilterServer(key, tableFilters);
        }
        else if (tableFiltersNumber > 1) {
            var arrayFilters = [];
            var keys = Object.keys(tableFilters);
            var filter;

            keys.forEach(function(key) {
                filter = getFilterServer(key, tableFilters);
                arrayFilters.push(filter);
            });

            filterServerParams = {
                'and': arrayFilters
            };
        }

        return filterServerParams;
    }

    function getFilterServer(key, tableFilters) {
        var filterServer = {};

        filterServer[key] = {
            'contains':tableFilters[key]
        };

        return filterServer;
    }

})();
