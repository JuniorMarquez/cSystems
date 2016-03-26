(function () {
    'use strict';

    angular
        .module('app.cuentaPorCobrar')
        .controller('CuentaPorCobrarController', CuentaPorCobrarController);

    CuentaPorCobrarController.$inject = ['logger',
        '$stateParams',
        '$location',
        'CuentaPorCobrar',
        'TableSettings',
        'CuentaPorCobrarForm'];
    /* @ngInject */
    function CuentaPorCobrarController(logger,
        $stateParams,
        $location,
        CuentaPorCobrar,
        TableSettings,
        CuentaPorCobrarForm) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(CuentaPorCobrar);
        vm.cuentaPorCobrar = {};

        vm.setFormFields = function(disabled) {
            vm.formFields = CuentaPorCobrarForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new CuentaPorCobrar object
            var cuentaPorCobrar = new CuentaPorCobrar(vm.cuentaPorCobrar);

            // Redirect after save
            cuentaPorCobrar.$save(function(response) {
                logger.success('CuentaPorCobrar created');
                $location.path('cuenta-por-cobrar/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing CuentaPorCobrar
        vm.remove = function(cuentaPorCobrar) {

            if (cuentaPorCobrar) {
                cuentaPorCobrar = CuentaPorCobrar.get({cuentaPorCobrarId:cuentaPorCobrar.id}, function() {
                    cuentaPorCobrar.$remove(function() {
                        logger.success('CuentaPorCobrar deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.cuentaPorCobrar.$remove(function() {
                    logger.success('CuentaPorCobrar deleted');
                    $location.path('/cuenta-por-cobrar');
                });
            }

        };

        // Update existing CuentaPorCobrar
        vm.update = function() {
            var cuentaPorCobrar = vm.cuentaPorCobrar;

            cuentaPorCobrar.$update(function() {
                logger.success('CuentaPorCobrar updated');
                $location.path('cuenta-por-cobrar/' + cuentaPorCobrar.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewCuentaPorCobrar = function() {
            vm.cuentaPorCobrar = CuentaPorCobrar.get({cuentaPorCobrarId: $stateParams.cuentaPorCobrarId});
            vm.setFormFields(true);
        };

        vm.toEditCuentaPorCobrar = function() {
            vm.cuentaPorCobrar = CuentaPorCobrar.get({cuentaPorCobrarId: $stateParams.cuentaPorCobrarId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            //logger.info('Activated CuentaPorCobrar View');
        }
    }

})();
