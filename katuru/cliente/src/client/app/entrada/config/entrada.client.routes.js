(function() {
    'use strict';

    angular
        .module('app.entrada')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listEntrada',
                config: {
                    url: '/entrada',
                    templateUrl: 'app/entrada/views/list.html',
                    controller: 'EntradaController',
                    controllerAs: 'vm',
                    title: 'Entradas',
                   /* settings: {
                        nav: 3,
                        content: '<i class="fa fa-cubes"></i> Entradas'
                    }*/
                }
            },
            {
                state: 'createEntrada',
                config: {
                    url: '/entrada/create',
                    templateUrl: 'app/entrada/views/create.html',
                    controller: 'EntradaController',
                    controllerAs: 'vm',
                    title: 'Create Entrada'
                }
            },
            {
                state: 'viewEntrada',
                config: {
                    url: '/entrada/:entradaId',
                    templateUrl: 'app/entrada/views/view.html',
                    controller: 'EntradaController',
                    controllerAs: 'vm',
                    title: 'View Entrada'
                }
            },
            {
                state: 'editEntrada',
                config: {
                    url: '/entrada/:entradaId/edit',
                    templateUrl: 'app/entrada/views/edit.html',
                    controller: 'EntradaController',
                    controllerAs: 'vm',
                    title: 'Edit Entrada'
                }
            }
        ];
    }
})();
