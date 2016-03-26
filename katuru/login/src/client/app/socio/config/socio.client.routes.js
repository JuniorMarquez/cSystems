(function() {
    'use strict';

    angular
        .module('app.socio')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listSocio',
                config: {
                    url: '/socio',
                    templateUrl: 'app/socio/views/list.html',
                    controller: 'SocioController',
                    controllerAs: 'vm',
                    title: 'List Socios',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-users"></i> Socios'
                    }
                }
            },
            {
                state: 'createSocio',
                config: {
                    url: '/socio/create',
                    templateUrl: 'app/socio/views/create.html',
                    controller: 'SocioController',
                    controllerAs: 'vm',
                    title: 'Create Socio'
                }
            },
            {
                state: 'viewSocio',
                config: {
                    url: '/socio/:socioId',
                    templateUrl: 'app/socio/views/view.html',
                    controller: 'SocioController',
                    controllerAs: 'vm',
                    title: 'View Socio'
                }
            },
            {
                state: 'editSocio',
                config: {
                    url: '/socio/:socioId/edit',
                    templateUrl: 'app/socio/views/edit.html',
                    controller: 'SocioController',
                    controllerAs: 'vm',
                    title: 'Edit Socio'
                }
            }
        ];
    }
})();
