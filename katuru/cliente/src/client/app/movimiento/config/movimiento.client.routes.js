(function() {
    'use strict';

    angular
        .module('app.movimiento')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listMovimiento',
                config: {
                    url: '/movimiento',
                    templateUrl: 'app/movimiento/views/list.html',
                    controller: 'MovimientoController',
                    controllerAs: 'vm',
                    title: 'List Movimientos',
                    // settings: {
                    //     nav: 3,
                    //     content: '<i class="fa fa-folder-open"></i> Movimientos'
                    // }
                }
            },
            {
                state: 'createMovimiento',
                config: {
                    url: '/movimiento/create',
                    templateUrl: 'app/movimiento/views/create.html',
                    controller: 'MovimientoController',
                    controllerAs: 'vm',
                    title: 'Create Movimiento'
                }
            },
            {
                state: 'viewMovimiento',
                config: {
                    url: '/movimiento/:movimientoId',
                    templateUrl: 'app/movimiento/views/view.html',
                    controller: 'MovimientoController',
                    controllerAs: 'vm',
                    title: 'View Movimiento'
                }
            },
            {
                state: 'editMovimiento',
                config: {
                    url: '/movimiento/:movimientoId/edit',
                    templateUrl: 'app/movimiento/views/edit.html',
                    controller: 'MovimientoController',
                    controllerAs: 'vm',
                    title: 'Edit Movimiento'
                }
            }
        ];
    }
})();
