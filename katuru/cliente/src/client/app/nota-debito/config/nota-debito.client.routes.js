(function() {
    'use strict';

    angular
        .module('app.notaDebito')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listNotaDebito',
                config: {
                    url: '/nota-debito',
                    templateUrl: 'app/nota-debito/views/list.html',
                    controller: 'NotaDebitoController',
                    controllerAs: 'vm',
                    title: 'List NotaDebitos',
                    // settings: {
                    //     nav: 3,
                    //     content: '<i class="fa fa-folder-open"></i> NotaDebitos'
                    // }
                }
            },
            {
                state: 'createNotaDebito',
                config: {
                    url: '/nota-debito/create',
                    templateUrl: 'app/nota-debito/views/create.html',
                    controller: 'NotaDebitoController',
                    controllerAs: 'vm',
                    title: 'Create NotaDebito'
                }
            },
             {
                state: 'createNotaDebito2',
                config: {
                    url: '/nota-debito/create2',
                    templateUrl: 'app/nota-debito/views/create2.html',
                    controller: 'NotaDebitoController',
                    controllerAs: 'vm',
                    title: 'Create NotaDebito2'
                }
            },
            {
                state: 'viewNotaDebito',
                config: {
                    url: '/nota-debito/:notaDebitoId',
                    templateUrl: 'app/nota-debito/views/view.html',
                    controller: 'NotaDebitoController',
                    controllerAs: 'vm',
                    title: 'View NotaDebito'
                }
            },
            {
                state: 'editNotaDebito',
                config: {
                    url: '/nota-debito/:notaDebitoId/edit',
                    templateUrl: 'app/nota-debito/views/edit.html',
                    controller: 'NotaDebitoController',
                    controllerAs: 'vm',
                    title: 'Edit NotaDebito'
                }
            }
        ];
    }
})();
