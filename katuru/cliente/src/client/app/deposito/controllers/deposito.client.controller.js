(function () {
    'use strict';

    angular
        .module('app.deposito')
        .controller('DepositoController', DepositoController);

    DepositoController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Deposito',
        'TableSettings',
        'DepositoForm',
        'MyService',
        '$http'];
    /* @ngInject */
    function DepositoController(logger,
        $stateParams,
        $location,
        Deposito,
        TableSettings,
        DepositoForm,
        MyService,
        $http) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Deposito);
        vm.deposito = {};
        vm.deposito.idE = MyService.data.idE;
        vm.deposito.idU = MyService.data.idU;
        vm.deposito.establecimiento = MyService.data.establecimiento;
        vm.setFormFields = function(disabled) {
            vm.formFields = DepositoForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Deposito object
            var deposito = new Deposito(vm.deposito);

            // Redirect after save
            deposito.$save(function(response) {
                logger.success('Deposito creado');
                $location.path('deposito/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Deposito
        vm.remove = function(deposito) {

            if (deposito) {
                deposito = Deposito.get({depositoId:deposito.id}, function() {
                    deposito.$remove(function() {
                        logger.success('Deposito borrado');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.deposito.$remove(function() {
                    logger.success('Deposito deleted');
                    $location.path('/deposito');
                });
            }

        };

        // Update existing Deposito
        vm.update = function() {
            var deposito = vm.deposito;

            deposito.$update(function() {
                logger.success('Deposito editado con exito');
                $location.path('deposito/' + deposito.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewDeposito = function() {
            vm.deposito = Deposito.get({depositoId: $stateParams.depositoId});
            vm.setFormFields(true);
        };

        vm.toEditDeposito = function() {
            vm.deposito = Deposito.get({depositoId: $stateParams.depositoId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            //logger.info('Activated Deposito View');
               $http.get('http://52.33.127.122:1337/deposito/?idE=' + MyService.data.idE).success(function(depositos){
          console.log("res:", depositos);
             vm.depositos2 = depositos.results;});
        }
    }

})();
