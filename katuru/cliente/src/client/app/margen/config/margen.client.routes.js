(function() {
    'use strict';

    angular
        .module('app.margen')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            /*{
                state: 'listMargen',
                config: {
                    url: '/margen',
                    templateUrl: 'app/margen/views/list.html',
                    controller: 'MargenController',
                    controllerAs: 'vm',
                    title: 'List Margens',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-folder-open"></i> Margens'
                    }
                }
            },*/
            {
                state: 'createMargen',
                config: {
                    url: '/margen/create',
                    templateUrl: 'app/margen/views/create.html',
                    controller: 'MargenController',
                    controllerAs: 'vm',
                    title: 'Create Margen'
                }
            },
            {
                state: 'viewMargen',
                config: {
                    url: '/margen/:margenId',
                    templateUrl: 'app/margen/views/view.html',
                    controller: 'MargenController',
                    controllerAs: 'vm',
                    title: 'View Margen'
                }
            },
            {
                state: 'editMargen',
                config: {
                    url: '/margen/:margenId/edit',
                    templateUrl: 'app/margen/views/edit.html',
                    controller: 'MargenController',
                    controllerAs: 'vm',
                    title: 'Edit Margen'
                }
            }
        ];
    }
})();
