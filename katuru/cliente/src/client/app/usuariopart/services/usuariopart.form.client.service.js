(function() {
    'use strict';

    angular
        .module('app.usuariopart')
        .factory('UsuariopartForm', factory);

    function factory() {

        var getFormFields = function(disabled) {

            var fields = [
               {
                    key: 'nombres',
                    type: 'input',
                    templateOptions: {
                        label: 'Nombres:',
                        required: true
                    }
                },
                {
                    key: 'apellidos',
                    type: 'input',
                    templateOptions: {
                        label: 'Apellidos:'
                    }
                },
                 {
                    key: 'user',
                    type: 'input',
                    templateOptions: {
                        label: 'User:'
                    }
                },
                 {
                    key: 'pass',
                    type: 'input',
                    templateOptions: {
                        label: 'contraseña:'
                    }
                },
                 {
    "key": "tipoUsuario",
    "type": "select",
    "templateOptions": {
      "label": "Tipo de Usuario",
      "options": [
        {
          "name": "Administrador",
          "value": "1"
        },
        {
          "name": "Vendedor",
          "value": "2"
        }
      ]
    }
  },
                 {
                    key: 'idE',
                    type: 'input',
                    templateOptions: {
                        label: 'Identificador de Establecimiento:'
                    }
                },
                 {
                    key: 'idSucursal',
                    type: 'input',
                    templateOptions: {
                        label: 'Identificador de Sucursal:'
                    }
                }
            ];

            return fields;

        };

        var service = {
            getFormFields: getFormFields
        };

        return service;

    }

})();
