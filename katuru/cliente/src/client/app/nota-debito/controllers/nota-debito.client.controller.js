(function () {
    'use strict';

    angular
        .module('app.notaDebito')
        .controller('NotaDebitoController', NotaDebitoController);

    NotaDebitoController.$inject = ['logger',
        '$stateParams',
        '$location',
        'NotaDebito',
        'MyService',
        '$http',
        'Entrada',
        'focus',
        '$scope',
        'Vent',
        '$modal',
        'Usuariopart',
        'TableSettings',
        'NotaDebitoForm'];
    /* @ngInject */
    function NotaDebitoController(logger,
        $stateParams,
        $location,
        NotaDebito,
        MyService,
        $http,
        Vent,
        Entrada,
        focus,
        $scope,
        $modal,
        Usuariopart,
        TableSettings,
        NotaDebitoForm) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(NotaDebito);
        vm.notaDebito = {};
        vm.notaDebito.itemsDevueltos=[];
        vm.movimiento={};
        vm.par = {};
        vm.vent = {};
        vm.vent.itemsDevueltos=[];
        vm.ventas5={};
        vm.calculosVent={};
        vm.notaDebito.idE=MyService.data.idE;
        vm.notaDebito.idU=MyService.data.idU;
        vm.notaDebito.idSucursal=MyService.data.idSucursal;
        vm.notaDebito.establecimiento=MyService.data.establecimiento;

        vm.setFormFields = function(disabled) {
            vm.formFields = NotaDebitoForm.getFormFields(disabled);
        };

        vm.cargarInfo = function(index){
            /* vm.vent.itemsDevueltos =[];*/
            vm.notaDebito.total=0;
            vm.vent =  vm.ventas5[index];
            vm.usuariopart = Usuariopart.get({usuariopartId: vm.vent.idU});
        };
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/   
        vm.deshacer=function(index){

            vm.vent.items.push(vm.vent.itemsDevueltos[index]/*{
            idEntrada:vm.itemsDevolver[index].idEntrada,
            producto:vm.itemsDevolver[index].producto,
            precioVenta : vm.itemsDevolver[index].precioVenta,
            cantidad: vm.itemsDevolver[index].cantidad,
            impuesto: vm.itemsDevolver[index].impuesto,
            subtotal:vm.itemsDevolver[index].subtotal,
            descuento:vm.itemsDevolver[index].descuento,
            total: vm.itemsDevolver[index].total
        }*/
            );    
            vm.vectorBorrado= vm.vent.itemsDevueltos[index];
            //alert("indice recibido: "+index);
            vm.vent.itemsDevueltos.splice(index, 1);
             if (vm.vent.itemsDevueltos.length<1){
                 document.getElementById('identificadorNota').style.visibility='hidden';
                document.getElementById('botonRegistrar').style.visibility='hidden';
            };
            var valorCant=0;
            var dato2=0;
            valorCant=parseInt(vm.vectorBorrado.cantidad);
            vm.descPro=vm.vectorBorrado.producto;
            vm.idEntradaBorrado =vm.vectorBorrado.idEntrada;
            MyService.data.idEntradaBorrado=vm.idEntradaBorrado;
            MyService.data.valorPre=0;
            var valorfinal=0;
            //alert("Cantidad "+valorCant+" "+vm.descPro+" ID: " +vm.idEntradaBorrado);//
            $http.get('http://52.33.127.122:1337/entrada/?idEntrada='+ vm.idEntradaBorrado).success(function(vectorActualizar){
                console.log("res:", vectorActualizar);
                vm.vectorActualizarX = vectorActualizar.results;
                dato2 =vm.vectorActualizarX[0].cantidad;
                MyService.data.valorPre=dato2;
                valorfinal=parseInt(MyService.data.valorPre)-parseInt(valorCant); 
                vm.vectorActualizarX[0].cantidad=valorfinal;
                vm.vectorActualizar=vm.vectorActualizarX[0];
                //alert("Stock previo: "+MyService.data.valorPre+" valor a sumar: "+valorCant+" Stock final: "+vm.vectorActualizar.cantidad);
                $http.put('http://52.33.127.122:1337/entrada/'+MyService.data.idEntradaBorrado , vm.vectorActualizar); 
                vm.vent.item={};
            })
        };
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
/*vm.calculo=function(index){
        
};*/
        vm.activaBoton=function(){
            document.getElementById('botonRegistrar').style.visibility='visible';

        };
        vm.devolver=function(index){
            vm.vectorBorrado= vm.vent.items[index];
            vm.vent.itemsDevueltos.push(vm.vectorBorrado);
            vm.notaDebito.total=vm.notaDebito.total+vm.vectorBorrado.total;
            vm.notaDebito.itemsDevueltos=vm.vent.itemsDevueltos;
            document.getElementById('identificadorNota').style.visibility='visible';
            document.getElementById('inputIdentificadorNota').focus();
            
            //alert("indice recibido: "+index);
        /*    vm.calculo(index);*/
            vm.vent.items.splice(index,1);
            var valorCant=0;
            var dato2=0;
            valorCant=parseInt(vm.vectorBorrado.cantidad);
            vm.descPro=vm.vectorBorrado.producto;
            vm.idEntradaBorrado =vm.vectorBorrado.idEntrada;
            MyService.data.idEntradaBorrado=vm.idEntradaBorrado;
            MyService.data.valorPre=0;
            var valorfinal=0;
    //alert("Cantidad "+valorCant+" "+vm.descPro+" ID: " +vm.idEntradaBorrado);//
            $http.get('http://52.33.127.122:1337/entrada/?idEntrada='+ vm.idEntradaBorrado).success(function(vectorActualizar){
                console.log("res:", vectorActualizar);
                vm.vectorActualizarX = vectorActualizar.results;
                dato2 =vm.vectorActualizarX[0].cantidad;
                MyService.data.valorPre=dato2;
                valorfinal=parseInt(MyService.data.valorPre)+parseInt(valorCant); 
                vm.vectorActualizarX[0].cantidad=valorfinal;

                vm.vectorActualizar=vm.vectorActualizarX[0];
                //alert("Stock previo: "+MyService.data.valorPre+" valor a sumar: "+valorCant+" Stock final: "+vm.vectorActualizar.cantidad);
                $http.put('http://52.33.127.122:1337/entrada/'+MyService.data.idEntradaBorrado , vm.vectorActualizar); 
            /*    vm.vent.item={};*/
            })
        };
        /* vm.updateVent = function() {
            var vent = vm.vent;

            vent.$update();
        };*/

        vm.actualizarVenta = function() {
           /* vm.updateVent();*/
            // Create new Vent object
            if (vm.notaDebito.total&&vm.notaDebito.total>0){
                vm.movimiento={};
                vm.movimiento.tipo="egreso"
                vm.movimiento.monto=vm.notaDebito.total;
                vm.movimiento.concepto="devolucion por nota de debito";
                vm.movimiento.categoria="nota de debito";
                vm.movimiento.ref=vm.vent.numeroFactura;
                vm.movimiento.idU=MyService.data.idU;
                vm.movimiento.idE=MyService.data.idE;
                vm.movimiento.idSucursal=MyService.data.idSucursal;
                $http.post('http://52.33.127.122:1337/movimiento/' , vm.movimiento); 

            }
            // if (vm.vent.totalCredito>0){
                
            //     vm.cuenta.nombreRazon=vm.vent.cliente.nombreRazon;
            //     vm.cuenta.numeroFactura=vm.vent.numeroFactura;
            //     vm.cuenta.fechaVencimiento=vm.vent.fechaCred;
            //     vm.cuenta.monto=vm.vent.totalCredito;
            //     vm.cuenta.estado="pendiente";
            //     $http.post('http://52.33.127.122:1337/cuentaporcobrar/' , vm.cuenta); 

            // }
            vm.notaDebito.numeroFactura=vm.vent.numeroFactura;
            vm.notaDebito.cliente=vm.vent.cliente;    
            $http.post('http://52.33.127.122:1337/notadebito/' , vm.notaDebito); 
            $http.put('http://52.33.127.122:1337/vent/'+vm.vent.id , vm.vent); 
            // Redirect after save
        };


        vm.create = function() {
            // Create new NotaDebito object
            var notaDebito = new NotaDebito(vm.notaDebito);
            // Redirect after save
            notaDebito.$save(function(response) {
                logger.success('NotaDebito created');
                $location.path('nota-debito/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing NotaDebito
        vm.remove = function(notaDebito) {

            if (notaDebito) {
                notaDebito = NotaDebito.get({notaDebitoId:notaDebito.id}, function() {
                    notaDebito.$remove(function() {
                        logger.success('NotaDebito deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.notaDebito.$remove(function() {
                    logger.success('NotaDebito deleted');
                    $location.path('/nota-debito');
                });
            }

        };

        // Update existing NotaDebito
        vm.update = function() {
            var notaDebito = vm.notaDebito;

            notaDebito.$update(function() {
                logger.success('NotaDebito updated');
                $location.path('nota-debito/' + notaDebito.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewNotaDebito = function() {
            vm.notaDebito = NotaDebito.get({notaDebitoId: $stateParams.notaDebitoId});
            vm.setFormFields(true);
        };

        vm.toEditNotaDebito = function() {
            vm.notaDebito = NotaDebito.get({notaDebitoId: $stateParams.notaDebitoId});
            vm.setFormFields(false);
        };




/*#####################################################################
*/
        function filtrado(){
            var date = new Date();
            var mes = date.getMonth();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            // alert("primer dia: "+firstDay+"ultimo dia: "+lastDay);
            vm.par.mes=mes;
            vm.par.firstDay=firstDay;
            vm.par.lastDay=lastDay;
            var result = [];
            var conversations = vm.ventas2;
            // filtros de la fecha
            var start_date =  Date.parse(firstDay);
            var end_date = Date.parse(lastDay);
            end_date=end_date+86400000; //### 60000 por minuto 
            //  si vm.articulos2 ha sido cargado
            if (vm.ventas2 && vm.ventas2.length > 0){
                for (var i=0;i<vm.ventas2.length;i++){
                    var conversationDate1 =  vm.ventas2[i].createdAt;
                    var conversationDate=Date.parse(conversationDate1);
                    // alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (conversationDate >= start_date && conversationDate <= end_date){
                        result.push(vm.ventas2[i]);
                    }
                }
                vm.ventas3=result;
            }
            if (vm.ventas3&&vm.ventas3.length>0){
                var ventasMes=0;
                var montoVentasMes = 0;
                for (var i = 0;i<vm.ventas3.length;i++){
                    // alert(vm.ventas2.length);
                    ventasMes=ventasMes+1;
                    montoVentasMes=montoVentasMes+vm.ventas3[i].totalEfectivo;
                    vm.calculosVent.montoVentasMes=montoVentasMes;
                    vm.calculosVent.ventasMes=ventasMes;
                }
            }
            if (vm.ventas3&&vm.ventas3.length>0){
                var bandera=1;
                var a =0;
                for(var i=0;i<vm.ventas3.length;i++){
                    bandera=parseInt(vm.ventas3[i].itemsDevueltos.length);
                    if(bandera!=0){              
                        }
                    else{
                        vm.ventas5[a]=vm.ventas3[i];
                        a=a+1;
                        bandera=1;
                    }
                } 
            }
        };
/*#####################################################################*/

        vm.filtrado3=function(){
            var result = [];
            var conversations = vm.ventas2;
            // filtros de la fecha
            var start_date =  Date.parse(vm.vent.fechaInicio) ;
            vm.par.firstDay =start_date;
            var end_date = Date.parse(vm.vent.fechaFin);        
            vm.par.lastDay =end_date;
            end_date=end_date+86400000; //### 60000 por minuto 
            vm.ventas5=[];
            //  si vm.articulos2 ha sido cargado
            if (vm.ventas2 && vm.ventas2.length > 0){
                for (var i=0;i<vm.ventas2.length;i++){
                    var conversationDate1 =  vm.ventas2[i].createdAt;
                    var conversationDate=Date.parse(conversationDate1);
                    //  alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (conversationDate >= start_date && conversationDate <= end_date){
                        result.push(vm.ventas2[i]);
                    }
                }
                vm.par.mensaje = "en el intervalo seleccionado";
                vm.par.mensaje2b = "en el intervalo seleccionado";
                vm.par.mensaje3b = "en el intervalo seleccionado";
                vm.ventas3=result;
            }
            if (vm.ventas3){
                for(i=0;i<vm.ventas3.length;i++){
                //alert("total de productos devueltos: "+vm.ventas3[i].itemsDevueltos.length);
                if(vm.ventas3[i].itemsDevueltos&&vm.ventas3[i].itemsDevueltos.length<0){
                    vm.ventas5[i]=vm.ventas3[i];
                    }
                } 
            }
            if (vm.ventas3&&vm.ventas3.length>1){
                var bandera=1;
                var a =0;
                for(var i=0;i<vm.ventas3.length;i++){
                    bandera=parseInt(vm.ventas3[i].itemsDevueltos.length);
                    if(bandera!=0){
                    }                
                    else{
                        vm.ventas5[a]=vm.ventas3[i];
                        a=a+1;
                        bandera=1;
                    }   
                } 
            }
        };
        activate();

        function activate() {
            //logger.info('Activated NotaDebito View');
            /*############################################*/
            $http.get('http://52.33.127.122:1337/vent/?idE=' + MyService.data.idE ).success(function(ventas){
                console.log("res:", ventas);
                vm.ventas2 = ventas.results;
                var ventasMes=0;
                var montoVentasMes = 0;
                filtrado();
            })
            /*###################################################*/
        }
    }

})();
