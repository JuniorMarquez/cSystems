(function() {
    'use strict';

    angular
        .module('app.ajuste')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listAjuste',
                config: {
                    url: '/ajuste',
                    templateUrl: 'app/ajuste/views/list.html',
                    controller: 'AjusteController',
                    controllerAs: 'vm',
                    title: 'Ajustes',
                    settings: {
                        // nav: 3,
                        // content: '<i class="fa fa-cogs"></i> Ajustes'
                    }
                }
            },
            {
                state: 'createAjuste',
                config: {
                    url: '/ajuste/create',
                    templateUrl: 'app/ajuste/views/create.html',
                    controller: 'AjusteController',
                    controllerAs: 'vm',
                    title: 'Create Ajuste'
                }
            },
            {
                state: 'viewAjuste',
                config: {
                    url: '/ajuste/:ajusteId',
                    templateUrl: 'app/ajuste/views/view.html',
                    controller: 'AjusteController',
                    controllerAs: 'vm',
                    title: 'View Ajuste'
                }
            },
            {
                state: 'editAjuste',
                config: {
                    url: '/ajuste/:ajusteId/edit',
                    templateUrl: 'app/ajuste/views/edit.html',
                    controller: 'AjusteController',
                    controllerAs: 'vm',
                    title: 'Edit Ajuste'
                }
            }
        ];
    }
})();
