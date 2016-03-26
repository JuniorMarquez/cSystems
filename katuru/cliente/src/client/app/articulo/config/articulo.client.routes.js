(function() {
    'use strict';

    angular
        .module('app.articulo')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listArticulo',
                config: {
                    url: '/articulo',
                    templateUrl: 'app/articulo/views/list.html',
                    controller: 'ArticuloController',
                    controllerAs: 'vm',
                    title: 'List Articulos',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-shopping-basket"></i> Productos'
                    }
                }
            },
            {
                state: 'createArticulo',
                config: {
                    url: '/articulo/create',
                    templateUrl: 'app/articulo/views/create.html',
                    controller: 'ArticuloController',
                    controllerAs: 'vm',
                    title: 'Create Articulo'
                }
            },
/*

            {
                state: 'homemodal',
                config: {
                    url: '/cate/create',
                    templateUrl: 'app/cate/views/create.html',
                    controller: 'CateController',
                    controllerAs: 'vm',
                    title: 'creacion de categoria'
                }
            },
*/
            {
                state: 'viewArticulo',
                config: {
                    url: '/articulo/:articuloId',
                    templateUrl: 'app/articulo/views/view.html',
                    controller: 'ArticuloController',
                    controllerAs: 'vm',
                    title: 'View Articulo'
                }
            },
            {
                state: 'editArticulo',
                config: {
                    url: '/articulo/:articuloId/edit',
                    templateUrl: 'app/articulo/views/edit.html',
                    controller: 'ArticuloController',
                    controllerAs: 'vm',
                    title: 'Edit Articulo'
                }
            }
        ];
    }
})();
