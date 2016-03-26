(function () {
    'use strict';

    angular
        .module('app.proveedor')
        .controller('ProveedorController', ProveedorController);

    ProveedorController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Proveedor',
        'TableSettings',
        'ProveedorForm',
        'MyService',
        '$http'];
    /* @ngInject */
    function ProveedorController(logger,
        $stateParams,
        $location,
        Proveedor,
        TableSettings,
        ProveedorForm,
        MyService,
        $http
        ) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Proveedor);
        vm.proveedor = {};
        vm.proveedor.idE = MyService.data.idE;
        vm.proveedor.idU = MyService.data.idU;
        vm.proveedor.establecimiento = MyService.data.establecimiento;

        vm.setFormFields = function(disabled) {
            vm.formFields = ProveedorForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Proveedor object
            var proveedor = new Proveedor(vm.proveedor);

            // Redirect after save
            proveedor.$save(function(response) {
                logger.success('Proveedor creado con éxito');
                $location.path('proveedor/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Proveedor
        vm.remove = function(proveedor) {

            if (proveedor) {
                proveedor = Proveedor.get({proveedorId:proveedor.id}, function() {
                    proveedor.$remove(function() {
                        logger.success('Proveedor borrado');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.proveedor.$remove(function() {
                    logger.success('Proveedor borrado');
                    $location.path('/proveedor');
                });
            }

        };

        // Update existing Proveedor
        vm.update = function() {
            var proveedor = vm.proveedor;

            proveedor.$update(function() {
                logger.success('Proveedor editado con éxito');
                $location.path('proveedor/' + proveedor.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewProveedor = function() {
            vm.proveedor = Proveedor.get({proveedorId: $stateParams.proveedorId});
            vm.setFormFields(true);
        };

        vm.toEditProveedor = function() {
            vm.proveedor = Proveedor.get({proveedorId: $stateParams.proveedorId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            //logger.info('Activated Proveedor View');
              $http.get('http://52.33.127.122:1337/proveedor/?idE=' + MyService.data.idE).success(function(proveedores){
          console.log("res:", proveedores);
             vm.proveedores2 = proveedores.results;});
        }
    }

})();
