(function () {
    'use strict';

    angular
        .module('app.margen')
        .controller('MargenController', MargenController);

    MargenController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Margen',
        'TableSettings',
        'MargenForm',
        'MyService',
        '$http'];
    /* @ngInject */
    function MargenController(logger,
        $stateParams,
        $location,
        Margen,
        TableSettings,
        MargenForm,
        MyService,
        $http) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Margen);
        vm.margen = {};
        vm.margen.idE=MyService.data.idE;
        vm.margen.idU=MyService.data.idU;
        vm.margen.idSucursal=MyService.data.idSucursal;
        vm.margen.establecimiento=MyService.data.establecimiento;

        vm.setFormFields = function(disabled) {
            vm.formFields = MargenForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Margen object
            var margen = new Margen(vm.margen);

            // Redirect after save
            margen.$save(function(response) {
                logger.success('Margen created');
                $location.path('margen/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Margen
        vm.remove = function(margen) {

            if (margen) {
                margen = Margen.get({margenId:margen.id}, function() {
                    margen.$remove(function() {
                        logger.success('Margen deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.margen.$remove(function() {
                    logger.success('Margen deleted');
                    $location.path('/margen');
                });
            }

        };

        // Update existing Margen
        vm.update = function() {
            var margen = vm.margen;

            margen.$update(function() {
                logger.success('Margen updated');
                $location.path('margen/' + margen.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewMargen = function() {
            vm.margen = Margen.get({margenId: $stateParams.margenId});
            vm.setFormFields(true);
        };

        vm.toEditMargen = function() {
            vm.margen = Margen.get({margenId: $stateParams.margenId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            //logger.info('Activated Margen View');
        }
    }

})();
