(function () {
    'use strict';

    angular
        .module('app.cliente')
        .controller('ClienteController', ClienteController);

    ClienteController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Cliente',
        'TableSettings',
        'ClienteForm',
         '$http',
         'MyService'];
    /* @ngInject */
    function ClienteController(logger,
        $stateParams,
        $location,
        Cliente,
        TableSettings,
        ClienteForm,
        $http,
        MyService) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Cliente);
        vm.cliente = {};
        vm.cliente.idE=MyService.data.idE;
        vm.cliente.idU=MyService.data.idU;
        vm.cliente.idSucursal=MyService.data.idSucursal;
        vm.cliente.establecimiento=MyService.data.establecimiento;


         vm.busquedaClientes=function(){
                $http.get('http://52.33.127.122:1337/cliente/?idE=' + MyService.data.idE ).success(function(clientes){
          console.log("res:", clientes);
             vm.clientes2 = clientes.results;});
        };
        vm.setFormFields = function(disabled) {
            vm.formFields = ClienteForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Cliente object
            var cliente = new Cliente(vm.cliente);

            // Redirect after save
            cliente.$save(function(response) {
                logger.success('Cliente created');
                $location.path('cliente/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Cliente
        vm.remove = function(cliente) {

            if (cliente) {
                cliente = Cliente.get({clienteId:cliente.id}, function() {
                    cliente.$remove(function() {
                        logger.success('Cliente deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.cliente.$remove(function() {
                    logger.success('Cliente deleted');
                    $location.path('/cliente');
                });
            }

        };

        // Update existing Cliente
        vm.update = function() {
            var cliente = vm.cliente;

            cliente.$update(function() {
                logger.success('Cliente updated');
                $location.path('cliente/' + cliente.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewCliente = function() {
            vm.cliente = Cliente.get({clienteId: $stateParams.clienteId});
            vm.setFormFields(true);
        };

        vm.toEditCliente = function() {
            vm.cliente = Cliente.get({clienteId: $stateParams.clienteId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            $http.get('http://52.33.127.122:1337/cliente/?idE=' + MyService.data.idE ).success(function(clientes){
          console.log("res:", clientes);
             vm.clientes2 = clientes.results;});
            //logger.info('Activated Cliente View');
        }
    }

})();
