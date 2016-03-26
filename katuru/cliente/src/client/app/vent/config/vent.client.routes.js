(function() {
    'use strict';

    angular
        .module('app.vent')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listVent',
                config: {
                    url: '/vent',
                    templateUrl: 'app/vent/views/list.html',
                    controller: 'VentController',
                    controllerAs: 'vm',
                    title: 'POS',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-shopping-cart"></i> POS'
                    }
                }
            },
            {
                state: 'createVent',
                config: {
                    url: '/vent/create',
                    templateUrl: 'app/vent/views/create.html',
                    controller: 'VentController',
                    controllerAs: 'vm',
                    title: 'Create Vent'
                }
            },
            {
                state: 'createVent2',
                config: {
                    url: '/vent/create2',
                    templateUrl: 'app/vent/views/create2.html',
                    controller: 'VentController',
                    controllerAs: 'vm',
                    title: 'Venta rapida'
                }
            },
            {
                state: 'viewVent',
                config: {
                    url: '/vent/:ventId',
                    templateUrl: 'app/vent/views/view.html',
                    controller: 'VentController',
                    controllerAs: 'vm',
                    title: 'View Vent'
                }
            },
            {
                state: 'editVent',
                config: {
                    url: '/vent/:ventId/edit',
                    templateUrl: 'app/vent/views/edit.html',
                    controller: 'VentController',
                    controllerAs: 'vm',
                    title: 'Edit Vent'
                }
            }
        ];
    }
})();
