(function () {
    'use strict';

    angular
        .module('app.sucursal')
        .controller('SucursalController', SucursalController);

    SucursalController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Sucursal',
        'TableSettings',
        'SucursalForm',
        'MyService',
        '$http'];
    /* @ngInject */
    function SucursalController(logger,
        $stateParams,
        $location,
        Sucursal,
        TableSettings,
        SucursalForm,
        MyService,
        $http) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Sucursal);
        vm.sucursal = {};
        vm.sucursal.idE = MyService.data.idE;
        vm.sucursal.idU = MyService.data.idU;
        vm.sucursal.establecimiento = MyService.data.establecimiento;
        vm.setFormFields = function(disabled) {
            vm.formFields = SucursalForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Sucursal object
            var sucursal = new Sucursal(vm.sucursal);

            // Redirect after save
            sucursal.$save(function(response) {
                logger.success('Sucursal creada con exito');
                $location.path('sucursal/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Sucursal
        vm.remove = function(sucursal) {

            if (sucursal) {
                sucursal = Sucursal.get({sucursalId:sucursal.id}, function() {
                    sucursal.$remove(function() {
                        logger.success('Sucursal borrada');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.sucursal.$remove(function() {
                    logger.success('Sucursal deleted');
                    $location.path('/sucursal');
                });
            }

        };

        // Update existing Sucursal
        vm.update = function() {
            var sucursal = vm.sucursal;

            sucursal.$update(function() {
                logger.success('Sucursal editada con exito');
                $location.path('sucursal/' + sucursal.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewSucursal = function() {
            vm.sucursal = Sucursal.get({sucursalId: $stateParams.sucursalId});
            vm.setFormFields(true);
        };

        vm.toEditSucursal = function() {
            vm.sucursal = Sucursal.get({sucursalId: $stateParams.sucursalId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
             $http.get('http://52.33.127.122:1337/sucursal/?idE=' + MyService.data.idE).success(function(sucursales){
          console.log("res:", sucursales);
             vm.sucursales2 = sucursales.results;});
        }
    }

})();
