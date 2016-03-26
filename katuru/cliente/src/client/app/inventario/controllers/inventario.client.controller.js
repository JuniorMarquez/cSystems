(function () {
    'use strict';

    angular
        .module('app.inventario')
        .controller('InventarioController', InventarioController);

    InventarioController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Inventario',
        'TableSettings',
        'InventarioForm',
        'MyService',
        '$http',
        'Entrada',
        'NotaDebito'];
    /* @ngInject */
    function InventarioController(logger,
        $stateParams,
        $location,
        Inventario,
        TableSettings,
        InventarioForm,
        MyService,
        $http,
        Entrada,
        NotaDebito) {

        var vm = this;
        var control = 0;
        vm.tableParams = TableSettings.getParams(Inventario);
        vm.inventario = {};

        vm.par={};
        vm.calculosEntradas = {};

        vm.setFormFields = function(disabled) {
            vm.formFields = InventarioForm.getFormFields(disabled);
        };
         function calculoEntradas() {
       
/*var vector=[];
vector=index;*/
     if (vm.inventarioEntradas3&&vm.inventarioEntradas3.length>0){
        var entradasMes=0;
        
        for (var i = 0;i<vm.inventarioEntradas3.length;i++){
            // alert(vm.ventas2.length);
            entradasMes=entradasMes+1;
           
            vm.calculosEntradas.entradasMes=entradasMes;
        }
    }
};
        vm.filtrado3=function(){
            control=1;
            var result = [];
            var conversations = vm.inventarioEntradas;
            // filtros de la fecha
            var start_date =  Date.parse(vm.vent.fechaInicio) ;
            vm.par.firstDay =start_date;
            var end_date = Date.parse(vm.vent.fechaFin);        
            vm.par.lastDay =end_date;
            end_date=end_date+86400000; //### 60000 por minuto 
            
            //  si vm.articulos2 ha sido cargado
            if (vm.inventarioEntradas && vm.inventarioEntradas.length > 0){
                for (var i=0;i<vm.inventarioEntradas.length;i++){
                    var conversationDate1 =  vm.inventarioEntradas[i].createdAt;
                    var conversationDate=Date.parse(conversationDate1);
                    //  alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (conversationDate >= start_date && conversationDate <= end_date){
                        result.push(vm.inventarioEntradas[i]);
                    }
                }
                vm.par.mensaje = "en el intervalo seleccionado";
               
                vm.inventarioEntradas3=result;
                calculoEntradas();
            }
        };

vm.remove2 = function(entrada) {

            if (entrada) {
                entrada = Entrada.get({entradaId:entrada.id}, function() {
                    entrada.$remove(function() {
                        logger.success('Entrada borrada');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.entrada.$remove(function() {
                    logger.success('Entrada borrada');
                    $location.path('/inventario');
                });
            }
// if (control==0){
    activate();
    filtrado();
//  }
//  else{
//     cargaEntradas();
//     vm.filtrado3();
// }
        };



function filtrado(){
control =0;
var date = new Date();
var mes = date.getMonth();
       var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
// alert("primer dia: "+firstDay+"ultimo dia: "+lastDay);
     vm.par.mes=mes;
vm.par.firstDay=firstDay;
vm.par.lastDay=lastDay;

            var result = [];
            var conversations = vm.inventarioEntradas;
            // filtros de la fecha
            var start_date =  Date.parse(firstDay);
            var end_date = Date.parse(lastDay);
            end_date=end_date+86400000; //### 60000 por minuto 
            //  si vm.articulos2 ha sido cargado
            if (vm.inventarioEntradas && vm.inventarioEntradas.length > 0){
                for (var i=0;i<vm.inventarioEntradas.length;i++){
                    var conversationDate1 =  vm.inventarioEntradas[i].createdAt;
                    var conversationDate=Date.parse(conversationDate1);
                    // alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (conversationDate >= start_date && conversationDate <= end_date){
                        result.push(vm.inventarioEntradas[i]);
                    }
                }
                vm.inventarioEntradas3=result;
          if (vm.inventarioEntradas3&&vm.inventarioEntradas3.length>0){
        var entradasMes=0;
        var montoNotasMes = 0;
        for (var i = 0;i<vm.inventarioEntradas3.length;i++){
            // alert(vm.inventarioEntradas.length);
            entradasMes=entradasMes+1;
        
            vm.calculosEntradas.entradasMes=entradasMes;
        }
    }
          }




      };
        vm.create = function() {
            // Create new Inventario object
            var inventario = new Inventario(vm.inventario);

            // Redirect after save
            inventario.$save(function(response) {
                logger.success('Inventario created');
                $location.path('inventario/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Inventario
        vm.remove = function(inventario) {

            if (inventario) {
                inventario = Inventario.get({inventarioId:inventario.id}, function() {
                    inventario.$remove(function() {
                        logger.success('Inventario deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.inventario.$remove(function() {
                    logger.success('Inventario deleted');
                    $location.path('/inventario');
                });
            }

        };

        // Update existing Inventario
        vm.update = function() {
            var inventario = vm.inventario;

            inventario.$update(function() {
                logger.success('Inventario updated');
                $location.path('inventario/' + inventario.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewInventario = function() {
            vm.inventario = Inventario.get({inventarioId: $stateParams.inventarioId});
            vm.setFormFields(true);
        };

        vm.toEditInventario = function() {
            vm.inventario = Inventario.get({inventarioId: $stateParams.inventarioId});
            vm.setFormFields(false);
        };

        activate();
function cargaEntradas(){


$http.get('http://52.33.127.122:1337/entrada/?idE=' + MyService.data.idE ).success(function(entradas){
            console.log("res:", entradas);
            vm.inventarioEntradas = entradas.results;
          
            // vm.cargarInfo(vm.entradas2);
        });
}
        function activate() {
            control = 0;
            vm.par.mensaje="en el mes";
            //logger.info('Activated Inventario View');
            $http.get('http://52.33.127.122:1337/entrada/?idE=' + MyService.data.idE ).success(function(entradas){
            console.log("res:", entradas);
            vm.inventarioEntradas = entradas.results;
            filtrado();
            // vm.cargarInfo(vm.entradas2);
        });
        }
    }

})();
