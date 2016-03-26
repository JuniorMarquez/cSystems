(function() {
    'use strict';

    angular
        .module('app.contabilidad')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'Contabilidad',
                config: {
                    url: '/contabilidad',
                    templateUrl: 'app/contabilidad/views/list.html',
                    controller: 'ContabilidadController',
                    controllerAs: 'vm',
                    title: 'Contabilidad',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-book"></i> Contabilidad'
                    }
                }
            },
            {
                state: 'createContabilidad',
                config: {
                    url: '/contabilidad/create',
                    templateUrl: 'app/contabilidad/views/create.html',
                    controller: 'ContabilidadController',
                    controllerAs: 'vm',
                    title: 'Create Contabilidad'
                }
            },
            {
                state: 'viewContabilidad',
                config: {
                    url: '/contabilidad/:contabilidadId',
                    templateUrl: 'app/contabilidad/views/view.html',
                    controller: 'ContabilidadController',
                    controllerAs: 'vm',
                    title: 'View Contabilidad'
                }
            },
            {
                state: 'editContabilidad',
                config: {
                    url: '/contabilidad/:contabilidadId/edit',
                    templateUrl: 'app/contabilidad/views/edit.html',
                    controller: 'ContabilidadController',
                    controllerAs: 'vm',
                    title: 'Edit Contabilidad'
                }
            }
        ];
    }
})();
