(function () {
    'use strict';

    angular
        .module('app.ingreso')
        .controller('IngresoController', IngresoController);

    IngresoController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Ingreso',
        'TableSettings',
        'IngresoForm'];
    /* @ngInject */
    function IngresoController(logger,
        $stateParams,
        $location,
        Ingreso,
        TableSettings,
        IngresoForm) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Ingreso);
        vm.ingreso = {};

        vm.setFormFields = function(disabled) {
            vm.formFields = IngresoForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Ingreso object
            var ingreso = new Ingreso(vm.ingreso);

            // Redirect after save
            ingreso.$save(function(response) {
                logger.success('Ingreso created');
                $location.path('ingreso/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Ingreso
        vm.remove = function(ingreso) {

            if (ingreso) {
                ingreso = Ingreso.get({ingresoId:ingreso.id}, function() {
                    ingreso.$remove(function() {
                        logger.success('Ingreso deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.ingreso.$remove(function() {
                    logger.success('Ingreso deleted');
                    $location.path('/ingreso');
                });
            }

        };

        // Update existing Ingreso
        vm.update = function() {
            var ingreso = vm.ingreso;

            ingreso.$update(function() {
                logger.success('Ingreso updated');
                $location.path('ingreso/' + ingreso.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewIngreso = function() {
            vm.ingreso = Ingreso.get({ingresoId: $stateParams.ingresoId});
            vm.setFormFields(true);
        };

        vm.toEditIngreso = function() {
            vm.ingreso = Ingreso.get({ingresoId: $stateParams.ingresoId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            //logger.info('Activated Ingreso View');
        }
    }

})();
