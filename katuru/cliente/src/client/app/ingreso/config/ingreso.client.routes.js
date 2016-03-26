(function() {
    'use strict';

    angular
        .module('app.ingreso')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listIngreso',
                config: {
                    url: '/ingreso',
                    templateUrl: 'app/ingreso/views/list.html',
                    controller: 'IngresoController',
                    controllerAs: 'vm',
                    title: 'List Ingresos',
                    /*settings: {
                        nav: 3,
                        content: '<i class="fa fa-folder-open"></i> Ingresos'
                    }*/
                }
            },
            {
                state: 'createIngreso',
                config: {
                    url: '/ingreso/create',
                    templateUrl: 'app/ingreso/views/create.html',
                    controller: 'IngresoController',
                    controllerAs: 'vm',
                    title: 'Create Ingreso'
                }
            },
            {
                state: 'viewIngreso',
                config: {
                    url: '/ingreso/:ingresoId',
                    templateUrl: 'app/ingreso/views/view.html',
                    controller: 'IngresoController',
                    controllerAs: 'vm',
                    title: 'View Ingreso'
                }
            },
            {
                state: 'editIngreso',
                config: {
                    url: '/ingreso/:ingresoId/edit',
                    templateUrl: 'app/ingreso/views/edit.html',
                    controller: 'IngresoController',
                    controllerAs: 'vm',
                    title: 'Edit Ingreso'
                }
            }
        ];
    }
})();
