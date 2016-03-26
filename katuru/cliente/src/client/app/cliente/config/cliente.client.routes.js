(function() {
    'use strict';

    angular
        .module('app.cliente')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listCliente',
                config: {
                    url: '/cliente',
                    templateUrl: 'app/cliente/views/list.html',
                    controller: 'ClienteController',
                    controllerAs: 'vm',
                    title: 'List Clientes',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-users"></i> Clientes'
                    }
                }
            },
            {
                state: 'createCliente',
                config: {
                    url: '/cliente/create',
                    templateUrl: 'app/cliente/views/create.html',
                    controller: 'ClienteController',
                    controllerAs: 'vm',
                    title: 'Create Cliente'
                }
            },
            {
                state: 'viewCliente',
                config: {
                    url: '/cliente/:clienteId',
                    templateUrl: 'app/cliente/views/view.html',
                    controller: 'ClienteController',
                    controllerAs: 'vm',
                    title: 'View Cliente'
                }
            },
            {
                state: 'editCliente',
                config: {
                    url: '/cliente/:clienteId/edit',
                    templateUrl: 'app/cliente/views/edit.html',
                    controller: 'ClienteController',
                    controllerAs: 'vm',
                    title: 'Edit Cliente'
                }
            }
        ];
    }
})();
