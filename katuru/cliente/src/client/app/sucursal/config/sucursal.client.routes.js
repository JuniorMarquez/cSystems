(function() {
    'use strict';

    angular
        .module('app.sucursal')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
           /* {
                state: 'listSucursal',
                config: {
                    url: '/sucursal',
                    templateUrl: 'app/sucursal/views/list.html',
                    controller: 'SucursalController',
                    controllerAs: 'vm',
                    title: 'List Sucursals',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-building-o"></i> Sucursales'
                    }
                }
            },*/
            {
                state: 'createSucursal',
                config: {
                    url: '/sucursal/create',
                    templateUrl: 'app/sucursal/views/create.html',
                    controller: 'SucursalController',
                    controllerAs: 'vm',
                    title: 'Create Sucursal'
                }
            },
            {
                state: 'viewSucursal',
                config: {
                    url: '/sucursal/:sucursalId',
                    templateUrl: 'app/sucursal/views/view.html',
                    controller: 'SucursalController',
                    controllerAs: 'vm',
                    title: 'View Sucursal'
                }
            },
            {
                state: 'editSucursal',
                config: {
                    url: '/sucursal/:sucursalId/edit',
                    templateUrl: 'app/sucursal/views/edit.html',
                    controller: 'SucursalController',
                    controllerAs: 'vm',
                    title: 'Edit Sucursal'
                }
            }
        ];
    }
})();
