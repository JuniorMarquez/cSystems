(function () {
    'use strict';

    angular
    
        .module('app.vent')
        .controller('VentController', VentController);

    VentController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Vent',
        'TableSettings',
        'VentForm',
        'MyService',
        '$http',
        'Entrada',
        '$modal',
        'focus',
        'Cliente',
        '$scope',
        '$timeout',
        'CuentaPorCobrar',
        'Usuariopart',
        'Ingreso'];
    /* @ngInject */
    function VentController(logger,
        $stateParams,
        $location,
        Vent,
        TableSettings,
        VentForm,
        MyService,
        $http,
        Entrada,
        $modal,
        focus,
        Cliente,
        $scope,
        $timeout,
        CuentaPorCobrar,
        Usuariopart,
        Ingreso) {

        var vm = this;
        var a = 0;
        vm.tableParams = TableSettings.getParams(Vent);
        vm.vent = {};
        vm.par={};
        vm.movimiento={};
        vm.cuenta={};
        vm.calculosVent={};
        vm.calculosNota={};
        vm.usuariopart={};
        vm.clienteNew={};
        vm.clienteNew.idE=MyService.data.idE;
        vm.clienteNew.idU=MyService.data.idU;
        vm.clienteNew.idSucursal=MyService.data.idSucursal;
        vm.clienteNew.establecimiento=MyService.data.establecimiento;
        vm.vent.cred={};
        vm.vent.items=[];
        vm.vent.itemsDevueltos=[];
        vm.vent.idE = MyService.data.idE;
        vm.vent.idSucursal = MyService.data.idSucursal;
        vm.vent.idU = MyService.data.idU;
        vm.vent.establecimiento = MyService.data.establecimiento;
        vm.setFormFields = function(disabled) {
            vm.formFields = VentForm.getFormFields(disabled);
        };
       

        vm.cargarInfo = function(index){
            vm.vent =  vm.ventas3[index];
            vm.usuariopart = Usuariopart.get({usuariopartId: vm.vent.idU});
        };

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
            var conversations2= vm.notas2;
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
                vm.ventas5=vm.ventas3;
                for (var i=0;i<vm.ventas5.length;i++){
                    //  alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (vm.ventas5[i].itemsDevueltos&&vm.ventas5[i].itemsDevueltos.length<0){
                        vm.ventas5.splice(i);
                    }
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
            }
        };

        function filtradoParaNotas(){
            var date = new Date();
            var mes = date.getMonth();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            // alert("primer dia: "+firstDay+"ultimo dia: "+lastDay);
            vm.par.mes=mes;
            vm.par.firstDay=firstDay;
            vm.par.lastDay=lastDay;
            var result = [];
            var conversations2= vm.notas2;
            // filtros de la fecha
            var start_date =  Date.parse(firstDay);
            var end_date = Date.parse(lastDay);
            end_date=end_date+86400000; //### 60000 por minuto 
            //  si vm.articulos2 ha sido cargado
            if (vm.notas2 && vm.notas2.length > 0){
                for (var i=0;i<vm.notas2.length;i++){
                    var conversationDate1 =  vm.notas2[i].createdAt;
                    var conversationDate=Date.parse(conversationDate1);
                    // alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (conversationDate >= start_date && conversationDate <= end_date){
                        result.push(vm.notas2[i]);
                        }
                }
                vm.notas3=result;
                // vm.notas5=vm.notas3;
                /*for (var i=0;i<vm.notas5.length;i++){     
                    //  alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (vm.notas5[i].itemsDevueltos&&vm.notas5[i].itemsDevueltos.length<0){
                        vm.notas5.splice(i);
                    }
                }*/
                if (vm.notas3&&vm.notas3.length>0){
                    var notasMes=0;
                    var montoNotasMes = 0;
                    for (var i = 0;i<vm.notas3.length;i++){
                        // alert(vm.notas2.length);
                        notasMes=notasMes+1;
                        montoNotasMes=montoNotasMes+vm.notas3[i].total;
                         vm.calculosNota.montoNotasMes=montoNotasMes;
                        vm.calculosNota.notasMes=notasMes;
                    }
                }
            }
        };

        function filtradoParaNotas3(){
            var date = new Date();
            var start_date =  Date.parse(vm.vent.fechaInicio) ;
            vm.par.firstDay =start_date;
            var end_date = Date.parse(vm.vent.fechaFin);        
            vm.par.lastDay =end_date;
            end_date=end_date+86400000;
            var mes = date.getMonth();
            //        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            // alert("primer dia: "+firstDay+"ultimo dia: "+lastDay);
            //      vm.par.mes=mes;
            // vm.par.firstDay=firstDay;
            // vm.par.lastDay=lastDay;
            var result = [];       
            var conversations2= vm.notas2;
            // filtros de la fecha
            /*  var start_date =  Date.parse(firstDay);
            var end_date = Date.parse(lastDay);
            end_date=end_date+86400000; //### 60000 por minuto */
            //  si vm.articulos2 ha sido cargado
            if (vm.notas2 && vm.notas2.length > 0){
                for (var i=0;i<vm.notas2.length;i++){
                    var conversationDate1 =  vm.notas2[i].createdAt;
                    var conversationDate=Date.parse(conversationDate1);
                    // alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (conversationDate >= start_date && conversationDate <= end_date){
                        result.push(vm.notas2[i]);
                    }
                }
                vm.notas3=result;
                // vm.notas5=vm.notas3;
                /*for (var i=0;i<vm.notas5.length;i++){
                    //  alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (vm.notas5[i].itemsDevueltos&&vm.notas5[i].itemsDevueltos.length<0){
                        vm.notas5.splice(i);
                    }
                }*/
                if (vm.notas3&&vm.notas3.length>0){
                    var notasMes=0;
                    var montoNotasMes = 0;
                    for (var i = 0;i<vm.notas3.length;i++){
                        // alert(vm.notas2.length);
                        notasMes=notasMes+1;
                        // montoNotasMes=montoNotasMes+vm.notas3[i].totalEfectivo;
                        // vm.calculosNota.montoNotasMes=montoNotasMes;
                        vm.calculosNota.notasMes=notasMes;
                    }
                }   
            }
        };

        vm.cancelar = function(){
            $location.path('/');
        };

        vm.create = function() {
            // Create new Vent object
            if (vm.vent.totalEfectivo&&vm.vent.totalEfectivo>0){
                vm.movimiento={};
                vm.movimiento.tipo="ingreso"
                vm.movimiento.monto=vm.vent.totalEfectivo;
                vm.movimiento.concepto="pago en efectivo por venta";
                vm.movimiento.categoria="venta al contado";
                vm.movimiento.ref=vm.vent.numeroFactura;
                vm.movimiento.idU=MyService.data.idU;
                vm.movimiento.idE=MyService.data.idE;
                vm.movimiento.idSucursal=MyService.data.idSucursal;
                $http.post('http://52.33.127.122:1337/movimiento/' , vm.movimiento); 

            }
            if (vm.vent.totalCredito>0){
                vm.cuenta.nombreRazon=vm.vent.cliente.nombreRazon;
                vm.cuenta.numeroFactura=vm.vent.numeroFactura;
                // var fechaVencimiento =  Date.parse(vm.vent.fechaCre) ;
                vm.cuenta.fechaVencimiento=Date.parse(vm.vent.fechaCred) ;
                vm.cuenta.monto=vm.vent.totalCredito;
                vm.cuenta.idU=MyService.data.idU;
                vm.cuenta.idE=MyService.data.idE;
                vm.cuenta.idSucursal=MyService.data.idSucursal;
                vm.cuenta.estado="pendiente";
                $http.post('http://52.33.127.122:1337/cuentaporcobrar/' , vm.cuenta); 
            }
            document.getElementById('late').style.visibility='visible';
            vm.vent.item={};
            var vent = new Vent(vm.vent);
            // Redirect after save
            vent.$save(function(response) {
                logger.success('Venta guardada');
                $location.path('/');
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.filtrado3=function(){
            var result = [];
            var conversations = vm.ventas2;
            // filtros de la fecha
            var start_date =  Date.parse(vm.vent.fechaInicio) ;
            vm.par.firstDay =start_date;
            var end_date = Date.parse(vm.vent.fechaFin);        
            vm.par.lastDay =end_date;
            end_date=end_date+86400000; //### 60000 por minuto 
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
                calculoVentas();
                vm.ventas5=vm.ventas3;
                for (var i=0;i<vm.ventas5.length;i++){
                    //  alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (vm.ventas5[i].itemsDevueltos.length<0){
                        vm.ventas5.splice(i,1);
                    }
                }
            }
            filtradoParaNotas3();
        };


        vm.agregarCliente=function(){
            $http.post('http://52.33.127.122:1337/cliente/' , vm.clienteNew); 
        };
        
        vm.open = function (size) {
            var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'VentController',
            size: size,
            resolve: {
                items: function () {
                    return vm.items;
                }
            }
        });

    modalInstance.result.then(function (selectedItem) {
      vm.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
        vm.confirmar = function() {
            $confirm({text: 'Desea  proceder con la venta?', title: 'Proceder', ok: 'Si', cancel: 'No'})
            .then(function() {
                vm.deletedConfirm = 'Confirmado';
            });
        };

        vm.proceder=function(){
            document.getElementById('guardar').style.visibility='visible';
            document.getElementById('guardar').disabled=false;
            if (vm.vent.cred.value1==true){
                vm.vent.total=3000;
            }
        };


        vm.borrar2 = function(index){
            vm.vent.descuento=0;
            document.getElementById('final').style.visibility='hidden';
            //alert("tamaño de array: "+vm.vent.items.length);
            if (vm.vent.items.length==1){
                vm.vent.dsctoGral=0;
                document.getElementById('definidor').style.visibility='visible';
                document.getElementById('cancelar').disabled=false;
                document.getElementById('dsctoGral').style.visibility='hidden';
                document.getElementById('late').style.visibility='visible';
            }
            vm.vectorBorrado= vm.vent.items[index];
            //alert("indice recibido: "+index);
            vm.vent.items.splice(index, 1);
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
                vm.vent.item={};
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
            vm.vent.subtotal=vm.vent.subtotal-(vm.vectorBorrado.total); 
            vm.vent.total=vm.vent.subtotal-vm.vent.dsctoGral;
            document.getElementById('cantidad').disabled=true;
            document.getElementById('agregar').disabled=true;
            document.getElementById('precioVenta').disabled=true;
            document.getElementById('descuentoPor').disabled=true;
        };

        vm.borrar = function(index){
            vm.vent.descuento=0;
            //alert("tamaño de array: "+vm.vent.items.length);
            if (vm.vent.items.length==1){
                vm.vent.dsctoGral=0;
                document.getElementById('cancelar').disabled=false;
                document.getElementById('dsctoGral').style.visibility='hidden';
                document.getElementById('late').style.visibility='visible';
            }
            vm.vectorBorrado= vm.vent.items[index];
            //alert("indice recibido: "+index);
            vm.vent.items.splice(index, 1);
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
                vm.vent.item={};
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse =  htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
            vm.vent.subtotal=vm.vent.subtotal-(vm.vectorBorrado.total); 
            vm.vent.total=vm.vent.subtotal-vm.vent.dsctoGral;
            document.getElementById('cantidad').disabled=true;
            document.getElementById('agregar').disabled=true;
            document.getElementById('precioVenta').disabled=true;
            document.getElementById('descuentoPor').disabled=true;
        };

        vm.dsctoGral=function(){
            vm.vent.dsctoGral=((vm.vent.subtotal*vm.vent.descuento)/100);
            vm.vent.total=vm.vent.subtotal-vm.vent.dsctoGral;
        }

        vm.agregar2=function(){
            document.getElementById('final').style.visibility='visible';
            document.getElementById('dsctoGral').style.visibility='visible';
            document.getElementById('definidor').style.visibility='hidden';
            document.getElementById('late').style.visibility='hidden';
            document.getElementById('cancelar').disabled=true; 
            vm.vent.items.push({
                idEntrada:vm.vent.item.entrada.id,
                producto:vm.vent.item.entrada.producto.descripcion, 
                precioVenta : vm.vent.item.entrada.precioVenta, 
                cantidad: vm.vent.item.cantidad,
                impuesto: vm.vent.item.entrada.impuesto,
                subtotal:vm.vent.item.subtotal,
                descuento:vm.vent.item.descuento,
                total: vm.vent.item.total
            });
            document.getElementById('cantidad').focus();
            document.getElementById('cantidad').disabled=true;
            document.getElementById('agregar').disabled=true;
            document.getElementById('precioVenta').disabled=true;
            document.getElementById('descuentoPor').disabled=true;
            vm.vent.item.entrada.cantidad=vm.vent.item.entrada.cantidad-vm.vent.item.cantidad;
            /* var entrada = vm.vent.item.producto; */
            /* vm.vent.seleccionado=[];
            vm.vent.seleccionado=vm.vent.item.producto; */
            vm.vent.item.entrada.idEntrada=vm.vent.item.entrada.id;
            $http.put('http://52.33.127.122:1337/entrada/'+vm.vent.item.entrada.id , vm.vent.item.entrada); 
            vm.vent.subtotal=vm.vent.subtotal+vm.vent.item.total;
            vm.vent.total=vm.vent.subtotal-vm.vent.dsctoGral;
            //vm.$broadcast('barcode');//s
            /* 
            *//*vm.vent.item.producto =null;*/

            //vm.vent.item={};
            vm.vent.item.entrada="";
            vm.vent.item.subtotal="";
            vm.vent.item.total="";
            vm.entradas2 =null;
            vm.entradas3 =null;
            vm.entradas4 =null;
            vm.vent.item.pbimp="";
            vm.vent.item.cantidad=1;
       };

        vm.agregar=function(){
            document.getElementById('dsctoGral').style.visibility='visible';
            document.getElementById('late').style.visibility='hidden';
            document.getElementById('cancelar').disabled=true; 
            vm.vent.items.push({
                idEntrada:vm.vent.item.entrada.id,
                producto:vm.vent.item.entrada.producto.descripcion, 
                precioVenta : vm.vent.item.entrada.precioVenta, 
                cantidad: vm.vent.item.cantidad,
                impuesto: vm.vent.item.entrada.impuesto,
                subtotal:vm.vent.item.subtotal,
                descuento:vm.vent.item.descuento,
                total: vm.vent.item.total
            });
            document.getElementById('cantidad').focus();
            document.getElementById('cantidad').disabled=true;
            document.getElementById('agregar').disabled=true;
            document.getElementById('precioVenta').disabled=true;
            document.getElementById('descuentoPor').disabled=true;
            vm.vent.item.entrada.cantidad=vm.vent.item.entrada.cantidad-vm.vent.item.cantidad;
           /* var entrada = vm.vent.item.producto; */
          /* vm.vent.seleccionado=[];
           vm.vent.seleccionado=vm.vent.item.producto; */
            vm.vent.item.entrada.idEntrada=vm.vent.item.entrada.id;
            $http.put('http://52.33.127.122:1337/entrada/'+vm.vent.item.entrada.id , vm.vent.item.entrada);
            vm.vent.subtotal=vm.vent.subtotal+vm.vent.item.total;
            vm.vent.total=vm.vent.subtotal-vm.vent.dsctoGral;
            //vm.$broadcast('barcode');//s
            /* 
            *//*vm.vent.item.producto =null;*/
            //vm.vent.item={};
            vm.vent.item.entrada="";
            vm.vent.item.subtotal="";
            vm.vent.item.total="";
            vm.entradas2 =null;
            vm.entradas3 =null;
            vm.entradas4 =null;
            vm.vent.item.pbimp="";
            vm.vent.item.cantidad=1;
       };


        vm.vaciar=function(){
            alert("tamaño del vector: "+vm.vent.items.length);
            var indice = 0 ;
            MyService.data.actualizar=[];
            vm.vectorActualizar=[];
            indice = vm.vent.items.length;
            for (var i=0; i < indice; i++){
               alert("indice a pasar: "+i);
               vm.borrar(i);
            //$timeout(function() {
                            
              //          }, 1000);
            }
        };       
        vm.limpiarCampos=function(){
            vm.vent.item={};
            /*
                 vm.vent.item.producto.producto.descripcion='';
                       vm.vent.item.producto.precioVenta=0;
                       vm.vent.item.cantidad=0;
                       vm.vent.item.producto.impuesto=0;
                       vm.vent.item.subtotal=0;
                       vm.vent.item.total=0;
              vm.vent.item.producto='';
            */      
        };
        vm.calculoPago=function(){
        //valida si cantidad decheques y monto estan vacios el total es cero
            if (vm.vent.montoCheque!=""){
                vm.vent.totalCheque=vm.vent.montoCheque;
            }
            else{
                vm.vent.totalCheque=0;
            }
            if (vm.vent.montoTran!=""){
                vm.vent.totalTran=vm.vent.montoTran;
            }
            else{
                vm.vent.totalTran=0;
            }
            if (vm.vent.montoCesta!=""||vm.vent.cantCesta!=""){
                vm.vent.totalCesta=vm.vent.montoCesta*vm.vent.cantCesta;
            }
            else{
                vm.vent.totalCesta=0;
                vm.vent.cantCesta=0;
                vm.vent.montoCesta=0;
            } 
            if (vm.vent.totalEfectivo==""){
                vm.vent.totalEfectivo=0;
            } 
            if (vm.vent.montoCredito!=""){
                vm.vent.totalCredito=vm.vent.montoCredito;
            }
            else{
                vm.vent.totalCredito=0;
            }
            vm.vent.resto=vm.vent.total-vm.vent.totalEfectivo-vm.vent.totalCheque-vm.vent.totalTran-vm.vent.totalCesta-vm.vent.totalCredito;
            //calcula el valor positvo de lo restante o asigna cero si no hay restante    
            if (vm.vent.resto<=0){
                vm.vent.vuelto=(vm.vent.resto*(-1));
                vm.vent.resta=0;
            }
            else{
                vm.vent.resta=vm.vent.resto;
                vm.vent.vuelto=0;
            }
        };

        vm.calculo=function(){
            //vm.vent.item.descuentoPor=(vm.vent.item.descuento / vm.vent.item.pbimp) *100 ; 
            if (vm.vent.item.pbimp==""){
                vm.vent.item.descuento=0;
            }
            else{
                vm.vent.item.descuento=((vm.vent.item.descuentoPor * vm.vent.item.pbimp) /100)*vm.vent.item.cantidad ;
            }
            var keepGoing = true;
            if(keepGoing) {
                if (vm.vent.item.cantidad<=vm.vent.item.entrada.cantidad){
                    vm.vent.item.pbimp=vm.vent.item.entrada.precioVenta+(vm.vent.item.entrada.precioVenta*vm.vent.item.entrada.impuesto/100);
                    vm.vent.item.subtotal=vm.vent.item.pbimp*vm.vent.item.cantidad;
                    if (vm.vent.item.descuento==0){
                        vm.vent.item.total=vm.vent.item.subtotal;
                    }
                    else {
                        vm.vent.item.total=vm.vent.item.subtotal-vm.vent.item.descuento;
                    }
                    if (vm.vent.item.cantidad>0){
                        document.getElementById('agregar').disabled=false; 
                        document.getElementById('precioVenta').disabled=false; 
                        document.getElementById('descuentoPor').disabled=false; 
                    }           
                }
                else {
                    if (isNaN(vm.vent.item.cantidad) && vm.vent.item.cantidad < 1){
                        alert("Debe ingresar un NUMERO comprendido entre 1 y " +vm.vent.item.entrada.cantidad +" (stock disponible)");  
                        document.getElementById('agregar').disabled=true;   
                    }
                    else {
                        alert("Debe ingresar un NUMERO comprendido entre 1 y " +vm.vent.item.entrada.cantidad +" (stock disponible)");
                        vm.vent.item.cantidad=0;
                        vm.vent.item.impuesto=null;
                        vm.vent.item.precioVenta=null;
                        vm.vent.item.subtotal=null;
                        vm.vent.item.total=null; 
                        vm.vent.item.descuento=null; 
                        keepGoing=false; 
                        document.getElementById('agregar').disabled=true; 
                        document.getElementById('precioVenta').disabled=true;
                        document.getElementById('descuentoPor').disabled=true;   
                    }
                }
            }   
        };

        vm.refreshClientes = function(search) {
            var params = {};
            params.where = {'cedulaRif': {
                'contains': search }};
                return $http.get(
                    'http://52.33.127.122:1337/cliente/',
                    {params: params}
                    ).then(function(response) {
                        vm.clientes2= response.data.results
                        for (var i= 0; i < vm.clientes2.length; i++)
                            {
                            if (vm.clientes2[i].idE != MyService.data.idE){
                                vm.clientes2.splice(i,1);
                                i=i-1;
                                }
                            }
                        });
        };

        vm.refreshEntradas = function(search) {
            var params = {};
            params.where = {'entrada.producto.titulo': {
                'contains': search }};
                return $http.get(
                    'http://52.33.127.122:1337/entrada/',
                    {params: params}
                    ).then(function(response) {
                        vm.entradas2= response.data.results
                        });
        };


   
        vm.activar=function(){
            document.getElementById('cantidad').disabled=false;
            document.getElementById('precioVenta').disabled=false;
            vm.vent.item.descuentoPor=0;
            document.getElementById('descuentoPor').disabled=false;
        };

        vm.refreshEntradas2 = function(search) {
            var params = {};
            params.where = {'producto.barcode': {
                'contains': search }};
                return $http.get(
                    'http://52.33.127.122:1337/entrada/',
                    {params: params}
                    ).then(function(response) {
                        vm.entradas3= response.data.results

                        for (var i= 0; i < vm.entradas3.length; i++)
                            {
                            if (vm.entradas3[i].cantidad < 1){
                                vm.entradas3.splice(i,1);
                                i=i-1;
                                }
                            }
                            
                       if (vm.vent.item.cantidad>0){vm.vent.item.cantidad=1;
                       if (vm.vent.item.entrada.precioVenta>0 && vm.vent.item.entrada!="undefined"){
                        vm.calculo();
                        document.getElementById('agregar').disabled=false;}
                       }
                        });      
        };
        vm.refreshEntradas3 = function(search) {
            var params = {};
            params.where = {'producto.cod': {
                'contains': search }};
                return $http.get(
                    'http://52.33.127.122:1337/entrada/',
                    {params: params}
                    ).then(function(response) {
                        vm.entradas4= response.data.results

                        for (var i= 0; i < vm.entradas4.length; i++)
                            {
                            if (vm.entradas4[i].cantidad < 1){
                                vm.entradas4.splice(i,1);
                                i=i-1;
                                }
                            }

                       if (vm.vent.item.cantidad>0){vm.vent.item.cantidad=1;
                     if (vm.vent.item.entrada.precioVenta>0 && vm.vent.item.entrada!="undefined") {
                        vm.calculo();
                        document.getElementById('agregar').disabled=false;}
                     }          
                        });        
        };
        vm.refreshEntradas4 = function(search) {
            var params = {};
            params.where = {
                'producto.titulo': {
                    'contains': search 
                }
            };
            return $http.get(
                'http://52.33.127.122:1337/entrada/',
                {params: params}
            ).then(function(response) {
                vm.entradas5= response.data.results
                for (var i= 0; i < vm.entradas5.length; i++){
                    if (vm.entradas5[i].cantidad < 1){
                        vm.entradas5.splice(i,1);
                        i=i-1;
                    }
                }
                if (vm.vent.item.cantidad>0){
                    vm.vent.item.cantidad=1;
                    if (vm.vent.item.entrada.precioVenta>0 && vm.vent.item.entrada!="undefined"){
                        vm.calculo();
                        document.getElementById('agregar').disabled=false;
                    }          
                }
            });
        };

        /* ====================== metodo que tambien funciona =========
  vm.refreshEntradas = function(search) {
            $http.get('http://52.33.127.122:1337/entrada/' ).success(function(entradas){
            console.log("res:", entradas);
            vm.entradas2 = entradas.results;});
            
            var requestParams = {};
            requestParams.limit = 10;
            requestParams.sort = 'producto.titulo ASC';
            requestParams.where = {
                'producto.titulo': {
                    'contains': search
                }
            };

            Entrada.get(requestParams, function(response) {
                vm.entradas2 = response.results;
            });
        }; ========================*/
        // Remove existing Vent
        vm.remove = function(vent) {

            if (vent) {
                vent = Vent.get({ventId:vent.id}, function() {
                    vent.$remove(function() {
                        logger.success('Vent deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.vent.$remove(function() {
                    logger.success('Vent deleted');
                    $location.path('/vent');
                });
            }

        };

        // Update existing Vent
        vm.update = function() {
            var vent = vm.vent;

            vent.$update(function() {
                logger.success('Vent updated');
                $location.path('vent/' + vent.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewVent = function() {
            vm.vent = Vent.get({ventId: $stateParams.ventId});
            vm.setFormFields(true);
        };

        vm.toEditVent = function() {
            vm.vent = Vent.get({ventId: $stateParams.ventId});
            vm.setFormFields(false);
        };

        activate();

        
        function calculoVentas() { 
            /*var vector=[];
            vector=index;*/
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
            else{
                montoVentasMes=0;
                vm.calculosVent.montoVentasMes=montoVentasMes;
                vm.calculosVent.ventasMes=0;
            }
        };
        function calculoVentasMes() {        
            /*var vector=[];
            vector=index;*/
            if (vm.ventas2&&vm.ventas2.length>0){
                var ventasMes=0;
                var montoVentasMes = 0;
                for (var i = 0;i<vm.ventas2.length;i++){
                    // alert(vm.ventas2.length);
                    ventasMes=ventasMes+1;
                    montoVentasMes=montoVentasMes+vm.ventas2[i].totalEfectivo;
                    vm.calculosVent.montoVentasMes=montoVentasMes;
                    vm.calculosVent.ventasMes=ventasMes;
                }
            }
        };

        function activate() {
            vm.par.mensaje = "en el mes";
            vm.par.mensaje2 = "Total de Ing. x ventas al contado";
            vm.par.mensaje3 = "En notas debito";
            vm.par.mensaje2b = "en el mes";
            vm.par.mensaje3b = "en el mes";
            $http.get('http://52.33.127.122:1337/vent/?idE=' + MyService.data.idE ).success(function(ventas){
                console.log("res:", ventas);
                vm.ventas2 = ventas.results;
                var ventasMes=0;
                var montoVentasMes = 0;
                calculoVentasMes();
                filtrado();
            });
            $http.get('http://52.33.127.122:1337/notadebito/?idE=' + MyService.data.idE ).success(function(notas){
                console.log("res:", notas);
                vm.notas2 = notas.results;
                var notasMes=0;
                var montoNotasMes = 0;
                filtradoParaNotas();
            }); 
            var vector1 = [];
            vector1 = vm.ventas2;
            calculoVentasMes();
            //logger.info('Activated Vent View');
//================================================================================      
            vm.vent.item={};
            vm.vent.total=0;
            vm.vent.subtotal=0;
            vm.vent.totalCheque=0;
            vm.vent.totalTran=0;
            vm.vent.montoCheque="";
            vm.vent.montoTran="";
            vm.vent.totalEfectivo="";
            vm.vent.montoCredito="";
            vm.vent.cantCesta="";
            vm.vent.montoCesta="";
            vm.vent.item.descuento="";
            vm.vent.item.pbimp="";
            vm.vent.dsctoGral=0;
            vm.vent.item.cantidad=1;
            vm.vent.item.entrada="";
//================================================================================      
        }  
    }
})();
