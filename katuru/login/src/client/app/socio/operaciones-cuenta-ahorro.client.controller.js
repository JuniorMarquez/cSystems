(function () {
    'use strict';

    angular
        .module('app.operacionesCuentaAhorro')
        .controller('OperacionesCuentaAhorroController', OperacionesCuentaAhorroController);

    OperacionesCuentaAhorroController.$inject = ['logger',
        '$stateParams',
        '$location',
        'OperacionesCuentaAhorro',
        'TableSettings',
        'OperacionesCuentaAhorroForm',
        'MyService'];
    /* @ngInject */
    function OperacionesCuentaAhorroController(logger,
        $stateParams,
        $location,
        OperacionesCuentaAhorro,
        TableSettings,
        OperacionesCuentaAhorroForm,
        MyService) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(OperacionesCuentaAhorro);
        vm.operacionesCuentaAhorro = {};
        vm.operacionesCuentaAhorro.extra = MyService.data.extra;
        vm.operacionesCuentaAhorro.id_socio =vm.operacionesCuentaAhorro.extra ;
        vm.setFormFields = function(disabled) {
            vm.formFields = OperacionesCuentaAhorroForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new OperacionesCuentaAhorro object
            var operacionesCuentaAhorro = new OperacionesCuentaAhorro(vm.operacionesCuentaAhorro);

            // Redirect after save
            operacionesCuentaAhorro.$save(function(response) {
                logger.success('OperacionesCuentaAhorro created');
                $location.path('operaciones-cuenta-ahorro/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing OperacionesCuentaAhorro
        vm.remove = function(operacionesCuentaAhorro) {

            if (operacionesCuentaAhorro) {
                operacionesCuentaAhorro = OperacionesCuentaAhorro.get({operacionesCuentaAhorroId:operacionesCuentaAhorro.id}, function() {
                    operacionesCuentaAhorro.$remove(function() {
                        logger.success('OperacionesCuentaAhorro deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.operacionesCuentaAhorro.$remove(function() {
                    logger.success('OperacionesCuentaAhorro deleted');
                    $location.path('/operaciones-cuenta-ahorro');
                });
            }

        };

        // Update existing OperacionesCuentaAhorro
        vm.update = function() {
            var operacionesCuentaAhorro = vm.operacionesCuentaAhorro;

            operacionesCuentaAhorro.$update(function() {
                logger.success('OperacionesCuentaAhorro updated');
                $location.path('operaciones-cuenta-ahorro/' + operacionesCuentaAhorro.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewOperacionesCuentaAhorro = function() {
            vm.operacionesCuentaAhorro = OperacionesCuentaAhorro.get({operacionesCuentaAhorroId: $stateParams.operacionesCuentaAhorroId});
            vm.setFormFields(true);
        };

        vm.toEditOperacionesCuentaAhorro = function() {
            vm.operacionesCuentaAhorro = OperacionesCuentaAhorro.get({operacionesCuentaAhorroId: $stateParams.operacionesCuentaAhorroId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            //logger.info('Activated OperacionesCuentaAhorro View');
        }
    }

})();
