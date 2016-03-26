(function() {
    'use strict';

    angular
        .module('app.usuariopart')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
           /* {
                state: 'listUsuariopart',
                config: {
                    url: '/usuariopart',
                    templateUrl: 'app/usuariopart/views/list.html',
                    controller: 'UsuariopartController',
                    controllerAs: 'vm',
                    title: 'List Usuarioparts',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-users"></i> Usuarios'
                    }
                }
            },*/
            {
                state: 'createUsuariopart',
                config: {
                    url: '/usuariopart/create',
                    templateUrl: 'app/usuariopart/views/create.html',
                    controller: 'UsuariopartController',
                    controllerAs: 'vm',
                    title: 'Create Usuariopart'
                }
            },
            {
                state: 'viewUsuariopart',
                config: {
                    url: '/usuariopart/:usuariopartId',
                    templateUrl: 'app/usuariopart/views/view.html',
                    controller: 'UsuariopartController',
                    controllerAs: 'vm',
                    title: 'View Usuariopart'
                }
            },
            {
                state: 'editUsuariopart',
                config: {
                    url: '/usuariopart/:usuariopartId/edit',
                    templateUrl: 'app/usuariopart/views/edit.html',
                    controller: 'UsuariopartController',
                    controllerAs: 'vm',
                    title: 'Edit Usuariopart'
                }
            }
        ];
    }
})();
