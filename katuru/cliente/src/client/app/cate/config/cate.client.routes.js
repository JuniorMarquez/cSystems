(function() {
    'use strict';

    angular
        .module('app.cate')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
         /* {
                state: 'listCate',
                config: {
                    url: '/cate',
                    templateUrl: 'app/cate/views/list.html',
                    controller: 'CateController',
                    controllerAs: 'vm',
                    title: 'List Cates',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-folder-open"></i> Cates'
                    }
                }
            },
      */
            {
                state: 'createCate',
                config: {
                    url: '/cate/create',
                    templateUrl: 'app/cate/views/create.html',
                    controller: 'CateController',
                    controllerAs: 'vm',
                    title: 'Create Cate'
                }
            },
            {
                state: 'viewCate',
                config: {
                    url: '/cate/:cateId',
                    templateUrl: 'app/cate/views/view.html',
                    controller: 'CateController',
                    controllerAs: 'vm',
                    title: 'View Cate'
                }
            },
            {
                state: 'editCate',
                config: {
                    url: '/cate/:cateId/edit',
                    templateUrl: 'app/cate/views/edit.html',
                    controller: 'CateController',
                    controllerAs: 'vm',
                    title: 'Edit Cate'
                }
            }
        ];
    }
})();
