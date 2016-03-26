(function () {
    'use strict';

    angular
        .module('app.movimiento')
        .controller('MovimientoController', MovimientoController);

    MovimientoController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Movimiento',
        'TableSettings',
        'MovimientoForm'];
    /* @ngInject */
    function MovimientoController(logger,
        $stateParams,
        $location,
        Movimiento,
        TableSettings,
        MovimientoForm) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Movimiento);
        vm.movimiento = {};

        vm.setFormFields = function(disabled) {
            vm.formFields = MovimientoForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Movimiento object
            var movimiento = new Movimiento(vm.movimiento);

            // Redirect after save
            movimiento.$save(function(response) {
                logger.success('Movimiento created');
                $location.path('movimiento/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Movimiento
        vm.remove = function(movimiento) {

            if (movimiento) {
                movimiento = Movimiento.get({movimientoId:movimiento.id}, function() {
                    movimiento.$remove(function() {
                        logger.success('Movimiento deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.movimiento.$remove(function() {
                    logger.success('Movimiento deleted');
                    $location.path('/movimiento');
                });
            }

        };

        // Update existing Movimiento
        vm.update = function() {
            var movimiento = vm.movimiento;

            movimiento.$update(function() {
                logger.success('Movimiento updated');
                $location.path('movimiento/' + movimiento.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewMovimiento = function() {
            vm.movimiento = Movimiento.get({movimientoId: $stateParams.movimientoId});
            vm.setFormFields(true);
        };

        vm.toEditMovimiento = function() {
            vm.movimiento = Movimiento.get({movimientoId: $stateParams.movimientoId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            //logger.info('Activated Movimiento View');
        }
    }

})();
