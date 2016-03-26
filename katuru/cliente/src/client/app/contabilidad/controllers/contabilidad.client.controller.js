(function () {
    'use strict';

    angular
        .module('app.contabilidad')
        .controller('ContabilidadController', ContabilidadController);

    ContabilidadController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Contabilidad',
        'TableSettings',
        '$modal',
        'ContabilidadForm',
        'MyService',
        '$http'];
    /* @ngInject */
    function ContabilidadController(logger,
        $stateParams,
        $location,
        Contabilidad,
        TableSettings,
        $modal,
        ContabilidadForm,
        MyService,
        $http) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Contabilidad);
        vm.contabilidad = {};
        vm.contabilidad.cuentas=[];
        vm.contabilidad.ingresos=[];
        vm.contabilidad.egresos=[];
        vm.par={};
        vm.pago={};
        var montoCuentas=0;
        var cuentas=0;

        vm.setFormFields = function(disabled) {
            vm.formFields = ContabilidadForm.getFormFields(disabled);
        };

        vm.cargarInfo = function(index){
            vm.cuenta =  vm.cuentas3[index];
           // var vencimientoDate =  Date.parse(vm.cuenta.fechaVencimiento) ;
           // vm.cuenta.fechaVencimiento= vencimientoDate;
           // vm.usuariopart = Usuariopart.get({usuariopartId: vm.cuenta.idU});
        };
        vm.registrarPago=function(){
            
        };
        vm.validar=function(){
            
            var sustraendo = vm.cuenta.montoPago;
            vm.cuenta.monto= vm.cuenta.monto-sustraendo;
            var valorCant=parseInt(vm.cuenta.monto);
            if (vm.cuenta.monto<=0){
                    vm.cuenta.estado="pagado";
                };

            var valorEstado=vm.cuenta.estado;
            vm.pago=vm.cuenta;
            // $http.get('http://52.33.127.122:1337/cuentaporcobrar/?id='+ vm.pago.id).success(function(vectorActualizar){
            //     console.log("res:", vectorActualizar);
            //     vm.vectorActualizarX = vectorActualizar.results;
            //     dato2 =vm.vectorActualizarX[0].monto;
            //     dato3 =vm.vectorActualizarX[0].estado;
            //     MyService.data.valorPre=dato2;
            //     MyService.data.valorPre3=dato3;
                // valorfinal=parseInt(valorCant); 
                // vm.vectorActualizarX[0].monto=valorfinal;
                // vm.vectorActualizarX[0].estado=valorEstado;
                
                // vm.vectorActualizar=vm.vectorActualizarX[0];
                //alert("Stock previo: "+MyService.data.valorPre+" valor a sumar: "+valorCant+" Stock final: "+vm.vectorActualizar.cantidad);
                $http.put('http://52.33.127.122:1337/cuentaporcobrar/'+vm.pago.id , vm.pago); 
             filtradoCuentas();
             vm.movimiento={};
                vm.movimiento.tipo="ingreso"
                vm.movimiento.monto=sustraendo;
                vm.movimiento.concepto="cobro de venta a credito";
                vm.movimiento.categoria="venta a credito";
                vm.movimiento.ref=vm.cuenta.numeroFactura;
                vm.movimiento.idU=MyService.data.idU;
                vm.movimiento.idE=MyService.data.idE;
                vm.movimiento.idSucursal=MyService.data.idSucursal;
                $http.post('http://52.33.127.122:1337/movimiento/' , vm.movimiento); 
            
        };
        vm.create = function() {
            // Create new Contabilidad object
            var contabilidad = new Contabilidad(vm.contabilidad);

            // Redirect after save
            contabilidad.$save(function(response) {
                logger.success('Contabilidad created');
                $location.path('contabilidad/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Contabilidad
        vm.remove = function(contabilidad) {

            if (contabilidad) {
                contabilidad = Contabilidad.get({contabilidadId:contabilidad.id}, function() {
                    contabilidad.$remove(function() {
                        logger.success('Contabilidad deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.contabilidad.$remove(function() {
                    logger.success('Contabilidad deleted');
                    $location.path('/contabilidad');
                });
            }

        };

        // Update existing Contabilidad
        vm.update = function() {
            var contabilidad = vm.contabilidad;

            contabilidad.$update(function() {
                logger.success('Contabilidad updated');
                $location.path('contabilidad/' + contabilidad.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewContabilidad = function() {
            vm.contabilidad = Contabilidad.get({contabilidadId: $stateParams.contabilidadId});
            vm.setFormFields(true);
        };

        vm.toEditContabilidad = function() {
            vm.contabilidad = Contabilidad.get({contabilidadId: $stateParams.contabilidadId});
            vm.setFormFields(false);
        };

        activate();
        vm.filtrado3=function(){
            var result = [];
            // filtros de la fecha
            var start_date =  Date.parse(vm.contabilidad.fechaInicio) ;
            vm.par.firstDay =start_date;
            var end_date = Date.parse(vm.contabilidad.fechaFin);        
            vm.par.lastDay =end_date;
            end_date=end_date+86400000; //### 60000 por minuto 
            vm.contabilidad.ingresos=[];
            vm.contabilidad.egresos=[];
            var montoIngresosMes=0;
                var montoEgresosMes = 0;
            //  si vm.articulos2 ha sido cargado
            if (vm.movimientos2 && vm.movimientos2.length > 0){
                for (var i=0;i<vm.movimientos2.length;i++){
                    var conversationDate1 =  vm.movimientos2[i].createdAt;
                    var conversationDate=Date.parse(conversationDate1);
                    //  alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (conversationDate >= start_date && conversationDate <= end_date){
                        result.push(vm.movimientos2[i]);
                    }
                }
                vm.par.mensaje = "en el intervalo seleccionado";
                vm.par.mensaje2b = "en el intervalo seleccionado";
                vm.par.mensaje3b = "en el intervalo seleccionado";
                vm.movimientos3=result;
            }
            if (vm.movimientos3&&vm.movimientos3.length>0){
                var montoIngresosMes=0;
                var montoEgresosMes = 0;
                for (var i = 0;i<vm.movimientos3.length;i++){
                    // alert(vm.ingresos2.length);
                    if (vm.movimientos3[i].tipo=="ingreso"){       
                        montoIngresosMes=montoIngresosMes+vm.movimientos3[i].monto;
                        vm.contabilidad.ingresos.push(vm.movimientos3[i]);
                        //alert("ingreso"+vm.movimientos3[i].concepto);
                    }
                    if (vm.movimientos3[i].tipo=="egreso"){
                        montoEgresosMes=montoEgresosMes+vm.movimientos3[i].monto; 
                        vm.contabilidad.egresos.push(vm.movimientos3[i]);
                    }

                }          
               
            }
            vm.contabilidad.montoIngresosMes=montoIngresosMes;
            vm.contabilidad.montoEgresosMes=montoEgresosMes;
            filtradoCuentasBajoDemanda();
        };
        function filtradoCuentasBajoDemanda() {
            var result = [];
            // filtros de la fecha
            var start_date =  Date.parse(vm.contabilidad.fechaInicio) ;
            vm.par.firstDay =start_date;
            var end_date = Date.parse(vm.contabilidad.fechaFin);        
            vm.par.lastDay =end_date;
            end_date=end_date+86400000;
            vm.cuentas3=[];
            montoCuentas=0;
            cuentas=0;
            vm.contabilidad.cuentas=[];
            // alert("primer dia: "+firstDay+"ultimo dia: "+lastDay);
            if (vm.cuentas2 && vm.cuentas2.length > 0){
                for (var i=0;i<vm.cuentas2.length;i++){
                    var conversationDate1 =  vm.cuentas2[i].createdAt;
                    var conversationDate=Date.parse(conversationDate1);
                    // alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (conversationDate >= start_date && conversationDate <= end_date){
                        result.push(vm.cuentas2[i]);
                    }
                }
                vm.cuentas3=result;
            }
            calculoCuentas();
            
        };
        function calculoCuentas(){
            montoCuentas=0;
                cuentas=0;
           if (vm.cuentas3&&vm.cuentas3.length>0){
                for (var i = 0;i<vm.cuentas3.length;i++){
                    // alert(vm.montoCuentasMes.length);
                    if (vm.cuentas3[i].estado=="pendiente"){       
                        montoCuentas=montoCuentas+vm.cuentas3[i].monto;
                        vm.contabilidad.cuentas.push(vm.cuentas3[i]);
                        cuentas=cuentas+1;
                        //alert("ingreso"+vm.cuentas3[i].concepto);
                    }
                    

                }          
                
            }
            vm.contabilidad.montoCuentas=montoCuentas;  
        };

        function calculoMovimientosMes() {
            vm.par.mensaje="en el mes";
            /*var vector=[];
            vector=index;*/
            var date = new Date();
            var mes = date.getMonth();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            // alert("primer dia: "+firstDay+"ultimo dia: "+lastDay);
            vm.par.mes=mes;
            vm.par.firstDay=firstDay;
            vm.par.lastDay=lastDay;
            var result = [];
            var start_date =  Date.parse(firstDay);
            var end_date = Date.parse(lastDay);
            end_date=end_date+86400000;
            if (vm.movimientos2 && vm.movimientos2.length > 0){
                for (var i=0;i<vm.movimientos2.length;i++){
                    var conversationDate1 =  vm.movimientos2[i].createdAt;
                    var conversationDate=Date.parse(conversationDate1);
                    // alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (conversationDate >= start_date && conversationDate <= end_date){
                        result.push(vm.movimientos2[i]);
                    }
                }
                vm.movimientos3=result;
            }


            if (vm.movimientos3&&vm.movimientos3.length>0){
                var montoIngresosMes=0;
                var montoEgresosMes = 0;
                for (var i = 0;i<vm.movimientos3.length;i++){
                    // alert(vm.ingresos2.length);
                    if (vm.movimientos3[i].tipo=="ingreso"){       
                        montoIngresosMes=montoIngresosMes+vm.movimientos3[i].monto;
                        vm.contabilidad.ingresos.push(vm.movimientos3[i]);
                        //alert("ingreso"+vm.movimientos3[i].concepto);
                    }
                    if (vm.movimientos3[i].tipo=="egreso"){
                        montoEgresosMes=montoEgresosMes+vm.movimientos3[i].monto; 
                        vm.contabilidad.egresos.push(vm.movimientos3[i]);
                    }

                }          
                vm.contabilidad.montoIngresosMes=montoIngresosMes;
                vm.contabilidad.montoEgresosMes=montoEgresosMes;
            }
        };
        function filtradoCuentas() {
            vm.par.mensaje="en el mes";
            /*var vector=[];
            vector=index;*/
            var date = new Date();
            var mes = date.getMonth();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            // alert("primer dia: "+firstDay+"ultimo dia: "+lastDay);
            vm.par.mes=mes;
            vm.par.firstDay=firstDay;
            vm.par.lastDay=lastDay;
            var result = [];
            var start_date =  Date.parse(firstDay);
            var end_date = Date.parse(lastDay);
            end_date=end_date+86400000;
            vm.contabilidad.cuentas=[];
            montoCuentas=0;
                cuentas=0;
            if (vm.cuentas2 && vm.cuentas2.length > 0){
                for (var i=0;i<vm.cuentas2.length;i++){
                    var conversationDate1 =  vm.cuentas2[i].createdAt;
                    var conversationDate=Date.parse(conversationDate1);
                    // alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (conversationDate >= start_date && conversationDate <= end_date){
                        result.push(vm.cuentas2[i]);
                    }
                }
                vm.cuentas3=result;
            }
            calculoCuentas();            
        };

        function activate() {
            //logger.info('Activated Contabilidad View');
            $http.get('http://52.33.127.122:1337/movimiento/?idE=' + MyService.data.idE ).success(function(movimientos){
                console.log("res:", movimientos);
                vm.movimientos2 =movimientos.results;
                var movimientosMes=0;
                /*var montoVentasMes = 0;*/
                calculoMovimientosMes()
            });
            $http.get('http://52.33.127.122:1337/cuentaporcobrar/?idE=' + MyService.data.idE ).success(function(cuentas){
                console.log("res:", cuentas);
                vm.cuentas2 =cuentas.results;
                var cuentasMes=0;
                /*var montoVentasMes = 0;*/
                filtradoCuentas()
            })
        }
    }

})();
