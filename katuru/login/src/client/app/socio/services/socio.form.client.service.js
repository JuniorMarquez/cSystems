(function() {
    'use strict';

    angular
        .module('app.socio')
        .factory('SocioForm', factory);

    function factory() {

        var getFormFields = function(disabled) {

            var fields = [
                {
                    key: 'nombres',
                    type: 'input',
                    templateOptions: {
                        label: 'Nombres:',
                        disabled: disabled,
                        required: true
                    }
                },
                {
                    key: 'apellidos',
                    type: 'input',
                    templateOptions: {
                        label: 'Apellidos:',
                        disabled: disabled,
                        required: true
                    }
                },
                {
                    key: 'cedula',
                    type: 'input',
                    templateOptions: {
                        label: 'Cedula:',
                        disabled: disabled,
                        required: true
                    }
                },


// ========================================================== //
 {
                    key: 'nacionalidad',
                    type: 'input',
                    templateOptions: {
                        label: 'Nacionalidad:',
                        disabled: disabled,
                        required: true
                    }
                },


                 {
                    key: 'estadoCivil',
                    type: 'input',
                    templateOptions: {
                        label: 'Estado Civil:',
                        disabled: disabled,
                        required: true
                    }
                },


                 {
                    key: 'fechaDeNacimiento',
                    type: 'input',
                    templateOptions: {
                        label: 'Fecha de Nacimiento:',
                        disabled: disabled,
                        required: true
                    }
                },


                 {
                    key: 'direccion',
                    type: 'input',
                    templateOptions: {
                        label: 'Direccion:',
                        disabled: disabled,
                        required: true
                    }
                },


                 {
                    key: 'telefono',
                    type: 'input',
                    templateOptions: {
                        label: 'Telefono:',
                        disabled: disabled,
                        required: true
                    }
                },


                 {
                    key: 'correo',
                    type: 'input',
                    templateOptions: {
                        label: 'Correo:',
                        disabled: disabled,
                        required: true
                    }
                },


                 {
                    key: 'ingresoMensual',
                    type: 'input',
                    templateOptions: {
                        label: 'Ingreso Mensual:',
                        disabled: disabled,
                        required: true
                    }
                },


                 {
                    key: 'profesion',
                    type: 'input',
                    templateOptions: {
                        label: 'Profesion:',
                        disabled: disabled,
                        required: true
                    }
                },


                 {
                    key: 'gradoDeInstruccion',
                    type: 'input',
                    templateOptions: {
                        label: 'Grado de Instruccion:',
                        disabled: disabled,
                        required: true
                    }
                },


                 {
                    key: 'ocupacion',
                    type: 'input',
                    templateOptions: {
                        label: 'Ocupacion:',
                        disabled: disabled,
                        required: true
                    }
                },


                 {
                    key: 'origenDeIngresos',
                    type: 'input',
                    templateOptions: {
                        label: 'Origen de Ingresos:',
                        disabled: disabled,
                        required: true
                    }
                },
                {
                    key: 'usuario',
                    type: 'input',
                    templateOptions: {
                        label: 'Usuario:',
                        disabled: disabled,
                        required: true
                    }
                },
                {
                    key: 'pass',
                    type: 'input',
                    templateOptions: {
                        label: 'Contraseña',
                        disabled: disabled,
                        required: true
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
          "name": "Superusuario",
          "value": "2"
        },
        {
          "name": "Tesorero",
          "value": "3"
        },
        {
          "name": "Comite",
          "value": "4"
        },
        {
          "name": "Fiscal",
          "value": "5"
        },
        {
          "name": "Socio",
          "value": "6"
        }
      ]
    }
  },









// ========================================================== //




               
            ];

            return fields;

        };

        var service = {
            getFormFields: getFormFields
        };

        return service;

    }

})();
