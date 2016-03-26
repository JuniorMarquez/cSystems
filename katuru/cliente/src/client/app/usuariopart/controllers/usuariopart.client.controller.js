(function () {
    'use strict';

    angular
        .module('app.usuariopart')
        .controller('UsuariopartController', UsuariopartController);

    UsuariopartController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Usuariopart',
        'TableSettings',
        'UsuariopartForm',
        'MyService',
        '$http'];
    /* @ngInject */
    function UsuariopartController(logger,
        $stateParams,
        $location,
        Usuariopart,
        TableSettings,
        UsuariopartForm,
        MyService,
        $http) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Usuariopart);
        vm.usuariopart = {};
        vm.usuariopart.idE = MyService.data.idE;
        vm.usuariopart.idU = MyService.data.idU;
        vm.usuariopart.establecimiento = MyService.data.establecimiento;
        vm.setFormFields = function(disabled) {
            vm.formFields = UsuariopartForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Usuariopart object
            var usuariopart = new Usuariopart(vm.usuariopart);

            // Redirect after save
            usuariopart.$save(function(response) {
                logger.success('Usuariopart created');
                $location.path('usuariopart/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Usuariopart
        vm.remove = function(usuariopart) {

            if (usuariopart) {
                usuariopart = Usuariopart.get({usuariopartId:usuariopart.id}, function() {
                    usuariopart.$remove(function() {
                        logger.success('Usuario borrado');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.usuariopart.$remove(function() {
                    logger.success('Usuariopart deleted');
                    $location.path('/usuariopart');
                });
            }

        };

        // Update existing Usuariopart
        vm.update = function() {
            var usuariopart = vm.usuariopart;

            usuariopart.$update(function() {
                logger.success('Usuario editado con exito');
                $location.path('usuariopart/' + usuariopart.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewUsuariopart = function() {
            vm.usuariopart = Usuariopart.get({usuariopartId: $stateParams.usuariopartId});
            vm.setFormFields(true);
        };

        vm.toEditUsuariopart = function() {
            vm.usuariopart = Usuariopart.get({usuariopartId: $stateParams.usuariopartId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            //logger.info('Activated Usuariopart View');
        }
    }

})();
