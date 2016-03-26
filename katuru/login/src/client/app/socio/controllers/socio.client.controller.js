(function () {
    'use strict';

    angular
        .module('app.socio')
.filter("toUpper", function(){
    return function(text){
        if(text != null){
            return text.toUpperCase();
        }
    }
 })       
        .filter('sumByKey', function () {
    return function (data, key) {
        if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
            return 0;
        }
        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            sum += parseInt(data[i][key]);
        }
        return sum;
    };
})
        .filter('sumByKey2', function () {
    return function (data, key, key2) {
        if (typeof (data) === 'undefined' ) {
            return 0;
        }
        var sum = 0;
        var sum2 = 0;
        var total=0;
        for (var i = data.length - 1; i >= 0; i--) {
            if (data[i][key]=="compra") {sum += parseInt(data[i][key2]);}
            if (data[i][key]=="traspaso+") {sum += parseInt(data[i][key2]);}
            if (data[i][key]=="traspaso-") {sum2 += parseInt(data[i][key2]);}           
        }
        total = sum - sum2;
        return total;
    };
})
        .controller('SocioController', SocioController);
    SocioController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Socio',
        'TableSettings',
        'SocioForm',
        'MyService',
        '$http']; 
    /* @ngInject */
    function SocioController(logger,
        $stateParams,
        $location,
        Socio,
        TableSettings,
        SocioForm,
        MyService,
        $http
        ) {

        var vm = this;
        
        vm.tableParams = TableSettings.getParams(Socio);
        vm.socio = {};            
        vm.setFormFields = function(disabled) {
            vm.formFields = SocioForm.getFormFields(disabled);

            
        };

        vm.create = function() {
            // Create new Socio object
            var socio = new Socio(vm.socio);

            // Redirect after save
            socio.$save(function(response) {
                logger.success('Socio agregado');
                $location.path('socio/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Socio
        vm.remove = function(socio) {

            if (socio) {
                socio = Socio.get({socioId:socio.id}, function() {
                    socio.$remove(function() {
                        logger.success('Socio borrado');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.socio.$remove(function() {
                    logger.success('Socio borrado');
                    $location.path('/socio');
                });
            }

        };

        // Update existing Socio
        vm.update = function() {
            var socio = vm.socio;

            socio.$update(function() {
                logger.success('Socio Actualizado');
                $location.path('socio/' + socio.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewSocio = function() {
            vm.socio = Socio.get({socioId: $stateParams.socioId});
            vm.socio.id_socio =  MyService.data.extra;
           $http.get('http://192.168.0.102:1337/operacionesCuentaAhorro/?id_socio=' + $stateParams.socioId).success(function(respuesta){
            //console.log("res:", respuesta);
            vm.paises = respuesta.results;
            
            console.log(respuesta);
            var tamano = 0;    
        });
           $http.get('http://192.168.0.102:1337/operacionesCcp/?id_socio=' + $stateParams.socioId).success(function(respuesta2){
            //console.log("res:", respuesta);
            vm.operaciones = respuesta2.results;

        }); 
           $http.get('http://192.168.0.102:1337/cuent/?id_socio=' + $stateParams.socioId).success(function(respuesta2){
            //console.log("res:", respuesta);
            vm.cuentasExistentes = respuesta2.results;

        }); 
         $http.get('http://192.168.0.102:1337/credito/?id_socio=' + $stateParams.socioId).success(function(respuesta3){
            //console.log("res:", respuesta);
            vm.creditos = respuesta3.results;

        });    
            vm.setFormFields(true);
       MyService.data.name = vm.socio.id;
            MyService.data.extra = vm.socio.id;
        };
        
 /*
        vm.getTotal = function(){
        var total = 0;
            for(var i = 0; i < respuesta.results.length; i++){
                var product = paises.monto[i];
                total += (total + product);
            }
            return total;
            vm.total=total;
        }; */
        vm.aperturar = function() {
            MyService.data.name = vm.socio.id;
            MyService.data.nombres = vm.socio.nombres;
            MyService.data.apellidos = vm.socio.apellidos;
            MyService.data.extra = vm.socio.id;
            
            
        };
        vm.compraCcp = function() {
            MyService.data.name = vm.socio.id;
            MyService.data.tipoOperacion = 'compra';
            
        };
        vm.traspasoCcp = function() {
            MyService.data.name = vm.socio.id;
            MyService.data.tipoOperacion = 'traspaso-';
            
        };
        /*
        vm.buscar = function() {
            
 $http.get("http://52.33.127.122:1337/socio?cedula=" + vm.cedula).success(function(respuesta){
            //console.log("res:", respuesta);
            vm.info = respuesta.results;
        });



        };
*/


        vm.toEditSocio = function() {
            
            vm.socio = Socio.get({socioId: $stateParams.socioId});
            vm.setFormFields(false);


        };

        activate();

        function activate() {
            MyService.data.name = vm.socio.createdAt;

            //logger.info('Activated Socio View');
        }
    }

})();
