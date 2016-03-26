(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger','$http','MyService','Vent'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger,$http,MyService,Vent) {
        var vm = this;
        vm.news = {
            title: 'Katuru ERP',
            description: 'generator-angular-crud allows creating entities ' +
                          'and CRUD operations very productively for AngularJS applications'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';
        vm.vent = {};
        activate();
        vm.par={};
        vm.calculosVent={};

        function activate() {
            
 $http.get('http://52.33.127.122:1337/vent/?idE=' + MyService.data.idE).success(function(ventas){
          console.log("res:", ventas);
             vm.ventas2 = ventas.results;
             filtrado();
             vm.par.mensaje2b = "Total por ventas del dia";

         })

            var promises = [getMessageCount(), getPeople()];
            return $q.all(promises).then(function() {
                //logger.info('Activated Dashboard View');
            });
        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function (data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }
        function filtrado(){

var date = new Date();
var mes = date.getMonth();
       var firstDay = new Date(Date.now());
var lastDay = new Date(date);
 var comparador = new Date(date.getFullYear(), date.getMonth(), date.getDate());
// alert("primer dia: "+firstDay+"ultimo dia: "+lastDay);
     vm.par.mes=mes;



            var result = [];
            var conversations = vm.ventas2;
            // filtros de la fecha
            // var dato =  Date.parse(comparador)-Date.parse(firstDay);
            var start_date=firstDay;
            var end_date = Date.parse(lastDay);
            vm.par.firstDay=start_date;
            start_date=start_date;
            end_date=end_date+86399000; //### 60000 por minuto 
            vm.par.lastDay=end_date;
            //  si vm.articulos2 ha sido cargado
            if (vm.ventas2 && vm.ventas2.length > 0){
                for (var i=0;i<vm.ventas2.length;i++){
                    var conversationDate1 =  vm.ventas2[i].createdAt;
                    var conversationDate=Date.parse(conversationDate1);
                     //alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (conversationDate >= start_date && conversationDate <= end_date){
                        result.push(vm.ventas2[i]);
                    }
                }
                vm.ventas3=result;
          if (vm.ventas3&&vm.ventas3.length>0){
        var ventasDia=0;
        var montoVentasDia = 0;
        for (var i = 0;i<vm.ventas3.length;i++){
            // alert(vm.ventas2.length);
            ventasDia=ventasDia+1;
            montoVentasDia=montoVentasDia+vm.ventas3[i].totalEfectivo;
            vm.calculosVent.montoVentasDia=montoVentasDia;
            vm.calculosVent.ventasDia=ventasDia;
        }
    }
          }




      };

        function getPeople() {
            return dataservice.getPeople().then(function (data) {
                vm.people = data;




                 $http.get('http://52.33.127.122:1337/proveedor/?idE=' + MyService.data.idE).success(function(proveedores){
          console.log("res:", proveedores);
             vm.proveedores2 = proveedores.results;});
                  $http.get('http://52.33.127.122:1337/articulo/?idE=' + MyService.data.idE).success(function(articulos){
          console.log("res:", articulos);
             vm.articulos2 = articulos.results;});
            });
                return vm.people;

        }
    }
})();
