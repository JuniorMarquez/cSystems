(function () {
    'use strict';

    angular
        .module('app.cate')
        .controller('CateController', CateController);

    CateController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Cate',
        'TableSettings',
        'CateForm',
        '$http',
        'MyService',
        '$modal'];
    /* @ngInject */
    
    function CateController(logger,
        $stateParams,
        $location,
        Cate,
        TableSettings,
        CateForm,
        $http,
        MyService,
        $modal) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Cate);
        vm.cate = {};
        vm.cate.idE = MyService.data.idE;
        vm.cate.idU = MyService.data.idU;
        vm.cate.idSucursal=MyService.data.idSucursal;

        vm.cate.establecimiento = MyService.data.establecimiento;
        

        vm.setFormFields = function(disabled) {
            vm.formFields = CateForm.getFormFields(disabled);
        };

        vm.create = function() {
            // Create new Cate object
            var cate = new Cate(vm.cate);

            // Redirect after save
            cate.$save(function(response) {
                logger.success('Categoria creada');
                $location.path('cate/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Cate
        vm.remove = function(cate) {

            if (cate) {
                cate = Cate.get({cateId:cate.id}, function() {
                    cate.$remove(function() {
                        logger.success('Categoría borrada');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.cate.$remove(function() {
                    logger.success('Cate deleted');
                    $location.path('/cate');
                });
            }

        };

/*
vm.openModal = function(){
$modal.open({templateUrl : 'create'});
};
*/

        // Update existing Cate
        vm.update = function() {
            var cate = vm.cate;

            cate.$update(function() {
                logger.success('Categoria editada con exito');
              $location.path('cate/' + cate.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewCate = function() {
            vm.cate = Cate.get({cateId: $stateParams.cateId});
            vm.setFormFields(true);
        };

        vm.toEditCate = function() {
            vm.cate = Cate.get({cateId: $stateParams.cateId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {

           
                 $http.get('http://52.33.127.122:1337/establecimiento/' + MyService.data.idE ).success(function(respuesta3){
            //console.log("res:", respuesta);
          //  if (respuesta2.tipoUsuario==="1"){$window.location.href = 'http://52.33.127.122:3000'};
           
           vm.cate.establecimiento = respuesta3.nombreRazon;   
        });

$http.get('http://52.33.127.122:1337/cate/?idE=' + MyService.data.idE).success(function(categorias){
          console.log("res:", categorias);
             vm.categorias2 = categorias.results;});
            //logger.info('Activated Cate View');
        }
    }

})();
