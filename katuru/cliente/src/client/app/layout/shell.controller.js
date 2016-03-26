/*(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger'];
    /* @ngInject *//*
    function ShellController($rootScope, $timeout, config, logger) {
        var vm = this;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        $rootScope.showSplash = true;
        vm.navline = {
            title: config.appTitle,
            text: 'Developed with generator-angular-crud',
            link: 'https://github.com/jlmonteagudo/generator-angular-crud'
        };

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
            hideSplash();
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                $rootScope.showSplash = false;
            }, 1000);
        }
    }
})();*/
(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger','MyService','$http'];
    /* @ngInject */
    function getGET(){
            var loc = document.location.href;
            var getString = loc.split('?')[1];
            var GET = getString.split('&');
            var get = {};//this object will be filled with the key-value pairs and returned.

            for(var i = 0, l = GET.length; i < l; i++){
                var tmp = GET[i].split('=');
                get[tmp[0]] = unescape(decodeURI(tmp[1]));
            }
            return get;

        }
    function ShellController($rootScope, $timeout, config, logger,MyService,$http) {
        var vm = this;
        vm.busyMessage = 'Espere porfavor ...';
        vm.ver="v. +beta 1.0.0 ";
    /*  
         var get = getGET();

                 $http.get('http://52.33.127.122:1337/usuariopart/' + get.id).success(function(respuesta2){
            //console.log("res:", respuesta);
          //  if (respuesta2.tipoUsuario==="1"){$window.location.href = 'http://52.33.127.122:3000'};
            
         MyService.data.nombres2 = respuesta2.nombres;   
        });
                 var nombres2='hola'+ MyService.data.idE;
       */


        vm.isBusy = true;
        $rootScope.showSplash = true;
        vm.navline = {
            title: config.appTitle,
            text: 'Katuru ERP',
            link: 'https://github.com/JuniorMarquez/cSystems'
        };
       
        activate();
        


        function activate() {
            logger.success(config.appTitle + ' cargado!', null);
            hideSplash();

///*
//===================BLOQUE DE CONSULTA=======================================================                             
            MyService.data.idE='';
            vm.nombres='';
            var nombre = this;
            var get = getGET();

                 $http.get('http://52.33.127.122:1337/usuariopart/' + get.id).success(function(respuesta2){
            //console.log("res:", respuesta);
          //  if (respuesta2.tipoUsuario==="1"){$window.location.href = 'http://52.33.127.122:3000'};
            MyService.data.idE = respuesta2.idE;
           MyService.data.idSucursal= respuesta2.idSucursal;
           MyService.data.idU= respuesta2.id; 
           MyService.data.establecimiento= respuesta2.establecimiento;  
         //   vm.nombres=respuesta2.nombres; //
        });
//==========================================================================
//*/


 

        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                $rootScope.showSplash = false;
            }, 1000);
        }
    }
})();
