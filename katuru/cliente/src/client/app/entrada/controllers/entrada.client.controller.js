(function () {
    'use strict';

    angular
        .module('app.entrada')
        .controller('EntradaController', EntradaController);

    EntradaController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Entrada',
        'TableSettings',
        'EntradaForm',
        'MyService',
        '$http',
        'Articulo',
        'Proveedor'];
    /* @ngInject */
    function EntradaController(logger,
        $stateParams,
        $location,
        Entrada,
        TableSettings,
        EntradaForm,
        MyService,
        $http,
        Articulo,
        Proveedor) {

       

        var vm = this;

        vm.tableParams = TableSettings.getParams(Entrada);
        vm.entrada = {};
         vm.entrada.idE = MyService.data.idE;
        vm.entrada.idSucursal = MyService.data.idSucursal;
        vm.entrada.idU = MyService.data.idU;
        vm.entrada.establecimiento = MyService.data.establecimiento;
       
        vm.setFormFields = function(disabled) {
            vm.formFields = EntradaForm.getFormFields(disabled);
        };
        vm.agregarCategoria=function(){
            $http.get('http://52.33.127.122:1337/establecimiento/' + MyService.data.idE ).success(function(respuesta3){
                    //console.log("res:", respuesta);
                  //  if (respuesta2.tipoUsuario==="1"){$window.location.href = 'http://52.33.127.122:3000'};
                   
                     
                });
           vm.categoriaNew.idE=MyService.data.idE;
                   vm.categoriaNew.idU=MyService.data.idU;
                   vm.categoriaNew.establecimiento=MyService.data.establecimiento;
            $http.post('http://52.33.127.122:1337/cate/' , vm.categoriaNew);
              vm.busquedaCategorias();
 
        };
        vm.agregarProducto=function(){
            
           vm.articulo.idE=MyService.data.idE;
                   vm.articulo.idU=MyService.data.idU;
                   vm.articulo.establecimiento=MyService.data.establecimiento;
            $http.post('http://52.33.127.122:1337/articulo/' , vm.articulo);
              
 
        };

        vm.busquedaCategorias=function(){
            $http.get('http://52.33.127.122:1337/cate/?idE=' + MyService.data.idE ).success(function(categorias){
            console.log("res:", categorias);
            vm.categorias2 = categorias.results;});
        };
        vm.agregarProveedor=function(){
        $http.get('http://52.33.127.122:1337/establecimiento/' + MyService.data.idE ).success(function(respuesta3){
            //console.log("res:", respuesta);
          //  if (respuesta2.tipoUsuario==="1"){$window.location.href = 'http://52.33.127.122:3000'};
           
           vm.proveedorNew.establecimiento = respuesta3.nombreRazon;   
        });
        vm.proveedorNew.idE=MyService.data.idE;
        vm.proveedorNew.idU=MyService.data.idU;
        vm.proveedorNew.establecimiento=MyService.data.establecimiento;
            $http.post('http://52.33.127.122:1337/proveedor/' , vm.proveedorNew);
           
        };

        vm.create = function() {
            vm.entrada.total=vm.entrada.precioCosto*vm.entrada.cantidad;
            vm.movimiento={};
            vm.movimiento.tipo="egreso"
            vm.movimiento.monto=vm.entrada.total;
            vm.movimiento.concepto="pago por compra";
            vm.movimiento.categoria="entrada de producto";
            vm.movimiento.ref=vm.entrada.factura;
            vm.movimiento.idU=MyService.data.idU;
            vm.movimiento.idE=MyService.data.idE;
            vm.movimiento.idSucursal=MyService.data.idSucursal;
            $http.post('http://52.33.127.122:1337/movimiento/' , vm.movimiento); 
            // Create new Entrada object
            var entrada = new Entrada(vm.entrada);

            // Redirect after save
            entrada.$save(function(response) {
                logger.success('Entrada created');
                $location.path('entrada/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Entrada
        vm.remove = function(entrada) {

            if (entrada) {
                entrada = Entrada.get({entradaId:entrada.id}, function() {
                    entrada.$remove(function() {
                        logger.success('Entrada deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.entrada.$remove(function() {
                    logger.success('Entrada deleted');
                    $location.path('/entrada');
                });
            }

        };
         vm.calculo=function(){
            vm.entrada.precioVenta=vm.entrada.precioCosto+((vm.entrada.precioCosto*vm.entrada.margen)/100);
        };
        vm.refreshProductos = function(search) {

            var requestParams = {};
            requestParams.limit = 10;
            requestParams.sort = 'titulo ASC';
            requestParams.where = {
                'titulo': {
                    'contains': search
                }
            };

            Articulo.get(requestParams, function(response) {
                vm.productos = response.results;
            });
        };
vm.refreshProveedors = function(search) {

            var requestParams = {};
            requestParams.limit = 10;
            requestParams.sort = 'nombreRazon ASC';
            requestParams.where = {
                'nombreRazon': {
                    'contains': search
                }
            };

            Proveedor.get(requestParams, function(response) {
                vm.proveedors = response.results;
            });
        };

        // Update existing Entrada
        vm.update = function() {
            var entrada = vm.entrada;

            entrada.$update(function() {
                logger.success('Entrada updated');
                $location.path('entrada/' + entrada.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };
        vm.updateEntrada = function() {
            
var entrada = vm.vent.item.producto;
            entrada.$update(function() {
                logger.success('Entrada updated');
                $location.path('entrada/' + entrada.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewEntrada = function() {
            vm.entrada = Entrada.get({entradaId: $stateParams.entradaId});
            vm.setFormFields(true);
        };

        vm.toEditEntrada = function() {
            vm.entrada = Entrada.get({entradaId: $stateParams.entradaId});
            vm.setFormFields(false);
        };

        activate();

/*vm.cargarInfo = function(vectorPas){
var infoArticulo = [];
var vector = [];
vector=vectorPas;
var identificador = 0;
if (vector && vector.length>0){
    for (var i=0;i<vm.entradas2.length;i++){
        identificador = vector[i].producto.id;
     infoArticulo[i] = Articulo.get({articuloId: identificador});
     alert("titulo: "+infoArticulo.titulo);
    vm.entradas2[i].nuevoTitulo=infoArticulo[i].titulo;
    
    }
}
// alert(vm.articulo.id)
// vm.articulo.existencia=0;
// vm.refreshEntradas9(vm.articulo.id);

        };*/


        function activate() {
            //logger.info('Activated Entrada View');
            
//======================================================================
            $http.get('http://52.33.127.122:1337/deposito/?idE=' + MyService.data.idE ).success(function(depositos){
            console.log("res:", depositos);
            vm.depositos2 = depositos.results;});


//================================================================================      
            $http.get('http://52.33.127.122:1337/sucursal/?idE=' + MyService.data.idE ).success(function(sucursales){
            console.log("res:", sucursales);
            vm.sucursales2 = sucursales.results;});
             

//================================================================================      
           $http.get('http://52.33.127.122:1337/entrada/?idE=' + MyService.data.idE ).success(function(entradas){
            console.log("res:", entradas);
            vm.entradas2 = entradas.results;
            // vm.cargarInfo(vm.entradas2);
        });

           $http.get('http://52.33.127.122:1337/impuesto/?idE=' + MyService.data.idE ).success(function(impuestos){
            console.log("res:", impuestos);
            vm.impuestos2 = impuestos.results;});
            $http.get('http://52.33.127.122:1337/margen/?idE=' + MyService.data.idE ).success(function(margenes){
            console.log("res:", margenes);
            vm.margenes2 = margenes.results;});
             

//================================================================================      


        }
    }

})();
