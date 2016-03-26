(function() {
    'use strict';

    angular
        .module('app.proveedor')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listProveedor',
                config: {
                    url: '/proveedor',
                    templateUrl: 'app/proveedor/views/list.html',
                    controller: 'ProveedorController',
                    controllerAs: 'vm',
                    title: 'List Proveedors',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-truck"></i> Proveedores'
                    }
                }
            },
            {
                state: 'createProveedor',
                config: {
                    url: '/proveedor/create',
                    templateUrl: 'app/proveedor/views/create.html',
                    controller: 'ProveedorController',
                    controllerAs: 'vm',
                    title: 'Create Proveedor'
                }
            },
            {
                state: 'viewProveedor',
                config: {
                    url: '/proveedor/:proveedorId',
                    templateUrl: 'app/proveedor/views/view.html',
                    controller: 'ProveedorController',
                    controllerAs: 'vm',
                    title: 'View Proveedor'
                }
            },
            {
                state: 'editProveedor',
                config: {
                    url: '/proveedor/:proveedorId/edit',
                    templateUrl: 'app/proveedor/views/edit.html',
                    controller: 'ProveedorController',
                    controllerAs: 'vm',
                    title: 'Edit Proveedor'
                }
            }
        ];
    }
})();
