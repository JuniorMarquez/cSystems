(function() {
    'use strict';

    angular
        .module('app.inventario')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listInventario',
                config: {
                    url: '/inventario',
                    templateUrl: 'app/inventario/views/list.html',
                    controller: 'InventarioController',
                    controllerAs: 'vm',
                    title: 'Inventario',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-cubes"></i> Inventario'
                    }
                }
            },
            {
                state: 'createInventario',
                config: {
                    url: '/inventario/create',
                    templateUrl: 'app/inventario/views/create.html',
                    controller: 'InventarioController',
                    controllerAs: 'vm',
                    title: 'Create Inventario'
                }
            },
            {
                state: 'viewInventario',
                config: {
                    url: '/inventario/:inventarioId',
                    templateUrl: 'app/inventario/views/view.html',
                    controller: 'InventarioController',
                    controllerAs: 'vm',
                    title: 'View Inventario'
                }
            },
            {
                state: 'editInventario',
                config: {
                    url: '/inventario/:inventarioId/edit',
                    templateUrl: 'app/inventario/views/edit.html',
                    controller: 'InventarioController',
                    controllerAs: 'vm',
                    title: 'Edit Inventario'
                }
            }
        ];
    }
})();
