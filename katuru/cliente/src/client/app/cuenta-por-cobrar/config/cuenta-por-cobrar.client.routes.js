(function() {
    'use strict';

    angular
        .module('app.cuentaPorCobrar')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listCuentaPorCobrar',
                config: {
                    url: '/cuenta-por-cobrar',
                    templateUrl: 'app/cuenta-por-cobrar/views/list.html',
                    controller: 'CuentaPorCobrarController',
                    controllerAs: 'vm',
                    title: 'List CuentaPorCobrars',
                  /*  settings: {
                        nav: 3,
                        content: '<i class="fa fa-newspaper-o"></i> Contabilidad'
                    }*/
                }
            },
            {
                state: 'createCuentaPorCobrar',
                config: {
                    url: '/cuenta-por-cobrar/create',
                    templateUrl: 'app/cuenta-por-cobrar/views/create.html',
                    controller: 'CuentaPorCobrarController',
                    controllerAs: 'vm',
                    title: 'Create CuentaPorCobrar'
                }
            },
            {
                state: 'viewCuentaPorCobrar',
                config: {
                    url: '/cuenta-por-cobrar/:cuentaPorCobrarId',
                    templateUrl: 'app/cuenta-por-cobrar/views/view.html',
                    controller: 'CuentaPorCobrarController',
                    controllerAs: 'vm',
                    title: 'View CuentaPorCobrar'
                }
            },
            {
                state: 'editCuentaPorCobrar',
                config: {
                    url: '/cuenta-por-cobrar/:cuentaPorCobrarId/edit',
                    templateUrl: 'app/cuenta-por-cobrar/views/edit.html',
                    controller: 'CuentaPorCobrarController',
                    controllerAs: 'vm',
                    title: 'Edit CuentaPorCobrar'
                }
            }
        ];
    }
})();
