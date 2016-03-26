(function() {
    'use strict';

    angular
        .module('app.impuesto')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            /*{
                state: 'listImpuesto',
                config: {
                    url: '/impuesto',
                    templateUrl: 'app/impuesto/views/list.html',
                    controller: 'ImpuestoController',
                    controllerAs: 'vm',
                    title: 'List Impuestos',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-folder-open"></i> Impuestos'
                    }
                }
            },*/
            {
                state: 'createImpuesto',
                config: {
                    url: '/impuesto/create',
                    templateUrl: 'app/impuesto/views/create.html',
                    controller: 'ImpuestoController',
                    controllerAs: 'vm',
                    title: 'Create Impuesto'
                }
            },
            {
                state: 'viewImpuesto',
                config: {
                    url: '/impuesto/:impuestoId',
                    templateUrl: 'app/impuesto/views/view.html',
                    controller: 'ImpuestoController',
                    controllerAs: 'vm',
                    title: 'View Impuesto'
                }
            },
            {
                state: 'editImpuesto',
                config: {
                    url: '/impuesto/:impuestoId/edit',
                    templateUrl: 'app/impuesto/views/edit.html',
                    controller: 'ImpuestoController',
                    controllerAs: 'vm',
                    title: 'Edit Impuesto'
                }
            }
        ];
    }
})();
