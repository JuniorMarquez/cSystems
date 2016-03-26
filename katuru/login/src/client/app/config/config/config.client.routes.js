(function() {
    'use strict';

    angular
        .module('app.config')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'viewConfig',
                config: {
                    url: 'config/55a95c87ebe973e1080ff5f0',
                    templateUrl: 'app/config/views/list.html',
                    controller: 'ConfigController',
                    controllerAs: 'vm',
                    title: 'List Configs',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-cogs"></i> Ajustes'
                    }
                }
            },
            {
                state: 'createConfig',
                config: {
                    url: '/config/create',
                    templateUrl: 'app/config/views/create.html',
                    controller: 'ConfigController',
                    controllerAs: 'vm',
                    title: 'Create Config'
                }
            },
            {
                state: 'listConfig',
                config: {
                    url: '/config/:configId',
                    templateUrl: 'app/config/views/view.html',
                    controller: 'ConfigController',
                    controllerAs: 'vm',
                    title: 'View Config'
                }
            },
            {
                state: 'editConfig',
                config: {
                    url: '/config/:configId/edit',
                    templateUrl: 'app/config/views/edit.html',
                    controller: 'ConfigController',
                    controllerAs: 'vm',
                    title: 'Edit Config'
                }
            }
        ];
    }
})();
