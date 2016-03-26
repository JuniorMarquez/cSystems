(function () {
    'use strict';
angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);
    DashboardController.$inject = [       
    'MyService',
    '$http',
    '$window'];
    function DashboardController(
    MyService,
    $http,
    $window) 
    {
        var vm = this;
        vm.datos={};
        vm.login = {};
        vm.dato={};
        vm.tipoUsuario = {};
        // vm.datos[0].login="";
        // vm.datos[0].id="";
        // vm.datos[0].tipoUsuario="";
        // vm.datos[0].idE="";
        // vm.datos[0].nombres="";
        // vm.datos[0].idSucursal="";
        // vm.datos[0].pass="";
        // vm.datos[0].user="";

        vm.login = function() 
        {
             if (vm.login.usuario=="" ||vm.login.pass==""){
            m.login.mensaje="Favor ingrese los datos"
        }    

            $http.get('http://52.33.127.122:1337/usuariopart/?user=' + vm.login.usuario).success(function(respuesta){
                vm.datos = respuesta.results;
vm.dato = vm.datos[0].user;
vm.tipoUsuario= vm.datos[0].tipoUsuario;
            vm.identificador=vm.datos[0].id;
            vm.idE=vm.datos[0].idE;
            vm.nombres=vm.datos[0].nombres;
            vm.idSucursal=vm.datos[0].idSucursal;
            vm.dato2= vm.datos[0].pass;

                if (vm.datos[0]=== 'undefined'){
                    vm.login.mensaje="ingrese los datos"
                }
                if (vm.datos === 'undefined'){
                    vm.login.mensaje="usuario no registrado"
                }
                if (vm.dato !== vm.login.usuario){
                    vm.login.mensaje="Usuario no registrado"
                }
                
            
            
            if (vm.login.usuario == vm.dato && vm.login.pass == vm.dato2)
                {
                if (vm.tipoUsuario==="1"){
                    $window.location.href = 'http://52.33.127.122:3001'+ '/?id=' + vm.identificador + '&nombres=' + vm.nombres
                };
                if (vm.tipoUsuario==="2"){
                    $window.location.href = 'http://52.33.127.122:3002'
                };               
            } 
            else
                {
                    if (vm.dato2 !== vm.login.pass){
                    vm.login.mensaje="Sr(a): "+vm.dato+" verifique la contraseña y vuelva a intentarlo";
                }
                }
            });
           
        };      
        function activate() 
            {
            }
        activate();
    }
})();














/*
<!--


       
        function activate() {
             var promises = [getPeople(),login()];
            return $q.all(promises).then(function() {
                //logger.info('Activated Dashboard View');
            });
            
            //logger.info('Activated Pago View');
        }
        /*function activate() {
            var promises = [getMessageCount(), getPeople()];
            return $q.all(promises).then(function() {
                //logger.info('Activated Dashboard View');
            });
        }*//*
        function getPeople() {
            return dataservice.getPeople().then(function (data) {
                vm.socios = data;
                return vm.socios;
                var msg = 'Socios cargados';
                logger.success(msg);
            });
        }
 var vm = this;
      vm.login function() 
        {
       
        return vm.login.mensaje;         
        }
        
    }
})();
--> */