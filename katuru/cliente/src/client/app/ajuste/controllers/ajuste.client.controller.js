(function () {
    'use strict';

    angular
        .module('app.ajuste')
        .controller('AjusteController', AjusteController);

    AjusteController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Ajuste',
        'TableSettings',
        'AjusteForm',
        'MyService',
        '$http',
        'Cate',
        'Deposito',
        'Sucursal',
        'Usuariopart'];
    /* @ngInject */
    function AjusteController(logger,
        $stateParams,
        $location,
        Ajuste,
        TableSettings,
        AjusteForm,
        MyService,
        $http,
        Cate,
        Deposito,
        Sucursal,
        Usuariopart) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Ajuste);
        vm.ajuste = {};
        vm.cate = {};
        vm.cate.idE = MyService.data.idE;

        vm.setFormFields = function(disabled) {
            vm.formFields = AjusteForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Ajuste object
            var ajuste = new Ajuste(vm.ajuste);

            // Redirect after save
            ajuste.$save(function(response) {
                logger.success('Ajuste created');
                $location.path('ajuste/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };
        
         vm.setFormFields2 = function(disabled) {
            vm.formFields2 = CateForm.getFormFields(disabled);
        };
        
        vm.create2 = function() {
            // Create new Cate object
            var cate = new Cate(vm.cate);

            // Redirect after save
            cate.$save(function(response) {
                logger.success('Cate created');
                $location.path('cate/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };


        vm.deposito = {};
        vm.deposito.idE = MyService.data.idE;
        

        vm.create3 = function() {
            // Create new Deposito object
            var deposito = new Deposito(vm.deposito);

            // Redirect after save
            deposito.$save(function(response) {
                logger.success('Deposito created');
                $location.path('deposito/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };


        vm.sucursal = {};

        vm.create5 = function() {
            // Create new Sucursal object
            var sucursal = new Sucursal(vm.sucursal);

            // Redirect after save
            sucursal.$save(function(response) {
                logger.success('Sucursal created');
                $location.path('sucursal/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };


        // Remove existing Ajuste
        vm.remove = function(ajuste) {

            if (ajuste) {
                ajuste = Ajuste.get({ajusteId:ajuste.id}, function() {
                    ajuste.$remove(function() {
                        logger.success('Ajuste deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.ajuste.$remove(function() {
                    logger.success('Ajuste deleted');
                    $location.path('/ajuste');
                });
            }

        };

        // Update existing Ajuste
        vm.update = function() {
            var ajuste = vm.ajuste;

            ajuste.$update(function() {
                logger.success('Ajuste updated');
                $location.path('ajuste/' + ajuste.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewAjuste = function() {
            vm.ajuste = Ajuste.get({ajusteId: $stateParams.ajusteId});
            vm.setFormFields(true);
        };

        vm.toEditAjuste = function() {
            vm.ajuste = Ajuste.get({ajusteId: $stateParams.ajusteId});
            vm.setFormFields(false);
        };
vm.remove2 = function(deposito) {

            if (deposito) {
                deposito = Deposito.get({depositoId:deposito.id}, function() {
                    deposito.$remove(function() {
                        logger.success('Deposito borrado');
                        vm.tableParams.reload();
                        $location.path('/ajuste');
                    });
                });
            } else {
                vm.deposito.$remove(function() {
                    logger.success('Depósito borrado');
                    $location.path('/');
                });
            }

        };
          vm.removeCate = function(cate) {

            if (cate) {
                cate = Cate.get({cateId:cate.id}, function() {
                    cate.$remove(function() {
                        logger.success('Categoría borrada');
                        vm.tableParams.reload();
                        $location.path('/');
                    });
                });
            } else {
                vm.cate.$remove(function() {
                    logger.success('Cate deleted');
                    $location.path('/cate');
                });
            }

        };
        activate();

        function activate() {
            //logger.info('Activated Ajuste View');
             $http.get('http://52.33.127.122:1337/deposito/?idE=' + MyService.data.idE).success(function(depositos){
          console.log("res:", depositos);
             vm.depositos2 = depositos.results;});


             $http.get('http://52.33.127.122:1337/cate/?idE=' + MyService.data.idE).success(function(categorias){
          console.log("res:", categorias);
             vm.categorias2 = categorias.results;});
              $http.get('http://52.33.127.122:1337/usuariopart/?idE=' + MyService.data.idE).success(function(usuarios){
          console.log("res:", usuarios);
             vm.usuarios2 = usuarios.results;});
              
             $http.get('http://52.33.127.122:1337/sucursal/?idE=' + MyService.data.idE).success(function(sucursales){
          console.log("res:", sucursales);
             vm.sucursales2 = sucursales.results;});
        }





        
    }

})();
