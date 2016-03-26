(function() {
    'use strict';

    angular
        .module('app.deposito')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            /*{
                state: 'listDeposito',
                config: {
                    url: '/deposito',
                    templateUrl: 'app/deposito/views/list.html',
                    controller: 'DepositoController',
                    controllerAs: 'vm',
                    title: 'List Depositos',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-cubes"></i> Depósitos'
                    }
                }
            },*/
            {
                state: 'createDeposito',
                config: {
                    url: '/deposito/create',
                    templateUrl: 'app/deposito/views/create.html',
                    controller: 'DepositoController',
                    controllerAs: 'vm',
                    title: 'Create Deposito'
                }
            },
            {
                state: 'viewDeposito',
                config: {
                    url: '/deposito/:depositoId',
                    templateUrl: 'app/deposito/views/view.html',
                    controller: 'DepositoController',
                    controllerAs: 'vm',
                    title: 'View Deposito'
                }
            },
            {
                state: 'editDeposito',
                config: {
                    url: '/deposito/:depositoId/edit',
                    templateUrl: 'app/deposito/views/edit.html',
                    controller: 'DepositoController',
                    controllerAs: 'vm',
                    title: 'Edit Deposito'
                }
            }
        ];
    }
})();
