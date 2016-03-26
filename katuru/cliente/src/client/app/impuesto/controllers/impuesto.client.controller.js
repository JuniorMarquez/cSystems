(function () {
    'use strict';

    angular
        .module('app.impuesto')
        .controller('ImpuestoController', ImpuestoController);

    ImpuestoController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Impuesto',
        'TableSettings',
        'ImpuestoForm',
        '$http',
        'MyService'];
    /* @ngInject */
    function ImpuestoController(logger,
        $stateParams,
        $location,
        Impuesto,
        TableSettings,
        ImpuestoForm,
        $http,
        MyService) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Impuesto);
        vm.impuesto = {};
        vm.impuesto.idE=MyService.data.idE;
        vm.impuesto.idU=MyService.data.idU;
        vm.impuesto.establecimiento=MyService.data.establecimiento;
        vm.impuesto.idSucursal=MyService.data.idSucursal;

        vm.setFormFields = function(disabled) {
            vm.formFields = ImpuestoForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Impuesto object
            var impuesto = new Impuesto(vm.impuesto);

            // Redirect after save
            impuesto.$save(function(response) {
                logger.success('Impuesto created');
                $location.path('impuesto/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Impuesto
        vm.remove = function(impuesto) {

            if (impuesto) {
                impuesto = Impuesto.get({impuestoId:impuesto.id}, function() {
                    impuesto.$remove(function() {
                        logger.success('Impuesto deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.impuesto.$remove(function() {
                    logger.success('Impuesto deleted');
                    $location.path('/impuesto');
                });
            }

        };

        // Update existing Impuesto
        vm.update = function() {
            var impuesto = vm.impuesto;

            impuesto.$update(function() {
                logger.success('Impuesto updated');
                $location.path('impuesto/' + impuesto.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewImpuesto = function() {
            vm.impuesto = Impuesto.get({impuestoId: $stateParams.impuestoId});
            vm.setFormFields(true);
        };

        vm.toEditImpuesto = function() {
            vm.impuesto = Impuesto.get({impuestoId: $stateParams.impuestoId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            //logger.info('Activated Impuesto View');
        }
    }

})();
