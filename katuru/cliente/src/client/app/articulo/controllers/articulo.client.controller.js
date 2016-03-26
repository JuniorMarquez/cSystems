(function () {
    'use strict';

    angular
        .module('app.articulo')
        .controller('ArticuloController', ArticuloController);

    ArticuloController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Articulo',
        'TableSettings',
        'ArticuloForm',
        '$modal',
        'MyService',
        '$http',
        'Proveedor',
        'Sucursal'/*,
        '$filter'*/];
    /* @ngInject */
    function ArticuloController(logger,
        $stateParams,
        $location,
        Articulo,
        TableSettings,
        ArticuloForm,
        $modal,
        MyService,
        $http,
        Proveedor,
        Sucursal
        /*,
        $filter */) {

        var vm = this;
      
        vm.tableParams = TableSettings.getParams(Articulo);
        vm.articulo={};
        vm.categoriaNew={}; 
         vm.bandera={};   
        vm.articulo.idE = MyService.data.idE;
        vm.categoriaNew.idE = MyService.data.idE;
        vm.categoriaNew.idSucursal = MyService.data.idSucursal;
        vm.categoriaNew.idU = MyService.data.idU;
        vm.categoriaNew.establecimiento = MyService.data.establecimiento;
        vm.articulo.idSucursal = MyService.data.idSucursal;
        vm.articulo.idU = MyService.data.idU;
        vm.articulo.establecimiento = MyService.data.establecimiento;

       /* vm.articulo.$watch('cod', function(val) {
    vm.articulo.cod = $filter('uppercase')(val);
  }, true);
*/
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
           
        }
        vm.agregarCategoria=function(){
            $http.get('http://52.33.127.122:1337/establecimiento/' + MyService.data.idE ).success(function(respuesta3){
                    //console.log("res:", respuesta);
                  //  if (respuesta2.tipoUsuario==="1"){$window.location.href = 'http://52.33.127.122:3000'};
                   
                   vm.categoriaNew.establecimiento = respuesta3.nombreRazon;   
                });
           
            $http.post('http://52.33.127.122:1337/cate/' , vm.categoriaNew);
              vm.busquedaCategorias();
 
        };
        vm.setFormFields = function(disabled) {
             
            vm.formFields = ArticuloForm.getFormFields(disabled);
        };


 vm.cargarInfo = function(index){
/* vm.vent =  vm.ventas2[index];

vm.usuariopart = Usuariopart.get({usuariopartId: vm.vent.idU});*/
vm.articulo=vm.articulos2[index];
// alert(vm.articulo.id)
vm.articulo.existencia=0;
vm.refreshEntradas9(vm.articulo.id);

        };
vm.refreshEntradas9 = function(index) {
    var params = {};
    params.where = {'producto.id': {
        'contains': index}};
        return $http.get(
            'http://52.33.127.122:1337/entrada/',
            {params: params}
            ).then(function(response) {
                 
                vm.entradas5= response.data.results
                if(vm.entradas5 && vm.entradas5.length>0){
                for (var i= 0; i < vm.entradas5.length; i++){
                    if (vm.entradas5[i].cantidad < 1){
                        vm.entradas5.splice(i,1);
                        i=i-1;
                        }
                    else{
                        vm.articulo.existencia=vm.articulo.existencia+vm.entradas5[i].cantidad;
                    }
                    }
                 }
               /*if (vm.vent.item.cantidad>0){vm.vent.item.cantidad=1;
               if (vm.vent.item.entrada.precioVenta>0 && vm.vent.item.entrada!="undefined"){
                vm.calculo();
                document.getElementById('agregar').disabled=false;}          
           }*/
                });      
};



        vm.create = function() {
            // Create new Articulo object
            var articulo = new Articulo(vm.articulo);

            // Redirect after save
            articulo.$save(function(response) {
                logger.success('Producto creado');
                $location.path('articulo/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

//==========================< FUNCION DE FILTRADO >===================================

      /*  vm.filtrado=function(){
            var result = [];
            var conversations = vm.articulos2;
            // filtros de la fecha
            var start_date =  Date.parse(vm.articulo.fechaInicio) ;
            var end_date = Date.parse(vm.articulo.fechaFin);
            end_date=end_date+86400000; //### 60000 por minuto 
            //  si vm.articulos2 ha sido cargado
            if (vm.articulos2 && vm.articulos2.length > 0){
                for (var i=0;i<vm.articulos2.length;i++){
                    var conversationDate1 =  vm.articulos2[i].createdAt;
                    var conversationDate=Date.parse(conversationDate1);
                    //  alert("fecha inicio: "+start_date +"fecha comparada: "+conversationDate+"fecha fin: "+end_date);
                    if (conversationDate >= start_date && conversationDate <= end_date){
                        result.push(vm.articulos2[i]);
                    }
                }
                vm.articulos3=result;
            }
        };*/

//==========================< FIN FUNCION DE FILTRADO >===================================



        // Remove existing Articulo
        vm.remove = function(articulo) {

            if (articulo) {
                articulo = Articulo.get({articuloId:articulo.id}, function() {
                    articulo.$remove(function() {
                        logger.success('Articulo deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.articulo.$remove(function() {
                    logger.success('Articulo deleted');
                    $location.path('/articulo');
                });
            }

        };

        // Update existing Articulo
        vm.update = function() {
            var articulo = vm.articulo;

            articulo.$update(function() {
                logger.success('Articulo updated');
                $location.path('articulo/' + articulo.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewArticulo = function() {
           
            
            vm.articulo = Articulo.get({articuloId: $stateParams.articuloId});
            /*$http.get('http://52.33.127.122:1337/cate/'+vm.articulo.categoria).success(function(detalleCategoria){
          console.log("res:", detalleCategoria);
             vm.articulo.categoria = detalleCategoria.results.descripcion;});
            */
            /*
            $http.get('http://52.33.127.122:1337/articulo/' + articuloId).success(function(articulos4){
          console.log("res:", articulos4);
             vm.articulos4= articulos4.results;});

MyService.data.idp= vm.art.proveedor;
$http.get('http://52.33.127.122:1337/proveedor/'+ MyService.data.idp).success(function(proveedores){
          vm.infor= {};
          console.log("res:", proveedores);
              vm.infor= proveedores.results;});
       

            
      

       
            
            
     */
            

            
       vm.setFormFields(true);
       var date = new Date();
       var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
//alert("primer dia: "+firstDay+"ultimo dia: "+lastDay);
        };
        

//==============================================
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







//===============================================
/*


        vm.openModal = function() {

            var modalInstance = $modal.open({
                backdrop: 'static',
                templateUrl: 'app/cate/views/create.html',
                controller: '../CateController'
                }
            );
        };


*/

//===============================================


        vm.toEditArticulo = function() {
            vm.articulo = Articulo.get({articuloId: $stateParams.articuloId});
            vm.setFormFields(false);
        };

        activate();
       

        function activate() {
            vm.articulos3=[];
            //logger.info('Activated Articulo View');
//================================================================================      
      $http.get('http://52.33.127.122:1337/cate/?idE=' + MyService.data.idE).success(function(categorias){
          console.log("res:", categorias);
             vm.categorias2 = categorias.results;});
        
//================================================================================      
             $http.get('http://52.33.127.122:1337/articulo/?idE=' + MyService.data.idE).success(function(articulos){
          console.log("res:", articulos);
             vm.articulos2 = articulos.results;});
//=================================================================================
             $http.get('http://52.33.127.122:1337/proveedor' ).success(function(proveedores){
          console.log("res:", proveedores);
             vm.proveedores2 = proveedores.results;});
            //================================================================================      

  
//=======================================================================================

//======================================================================
             $http.get('http://52.33.127.122:1337/deposito/?idE=' + MyService.data.idE ).success(function(depositos){
          console.log("res:", depositos);
             vm.depositos2 = depositos.results;});


//================================================================================      
$http.get('http://52.33.127.122:1337/sucursal/?idE=' + MyService.data.idE ).success(function(sucursales){
          console.log("res:", sucursales);
             vm.sucursales2 = sucursales.results;});
             

//================================================================================      



        }
    }

})();
