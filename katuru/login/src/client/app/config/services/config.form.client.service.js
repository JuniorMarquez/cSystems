(function() {
    'use strict';

    angular
        .module('app.config')
        .factory('ConfigForm', factory);

    function factory() {

        var getFormFields = function(disabled) {

            var fields = [
                {
                    key: 'identificador',
                    type: 'input',
                    templateOptions: {
                        label: 'Identificador:',
                        disabled: disabled,
                        required: true
                    }
                },
                {
                    key: 'precioCcp',
                    type: 'input',
                    templateOptions: {
                        label: 'Precio C.C.P:',
                        disabled: disabled
                    }
                },
                {
                    key: 'eqCcp',
                    type: 'input',
                    templateOptions: {
                        label: 'Equivalencia de CCP:',
                        disabled: disabled,
                        required: true
                    }
                },
                
               

{
    "key": "numeroMeses",
    "type": "select",
    "templateOptions": {
      "label": "Numero de meses",
      "options": [
        {
          "name": "uno",
          "value": "1"
        },
        {
          "name": "dos",
          "value": "2"
        },
        {
          "name": "tres",
          "value": "3"
        },
        {
          "name": "cuatro",
          "value": "4"
        },
        {
          "name": "cinco",
          "value": "5"
        },
        {
          "name": "seis",
          "value": "6"
        },
        {
          "name": "siete",
          "value": "7"
        },
        {
          "name": "ocho",
          "value": "8"
        },
        {
          "name": "nueve",
          "value": "9"
        },
        {
          "name": "diez",
          "value": "10"
        },
        {
          "name": "once",
          "value": "11"
        },
        {
          "name": "doce",
          "value": "12"
        }
      ]
    }
  },



                {
                    key: 'interesCreditoInterno',
                    type: 'input',
                    templateOptions: {
                        label: 'Tasa de interes de Credito Interno:',
                        disabled: disabled,
                        required: true
                    }
                },
                {
                    key: 'interesCreditoExterno',
                    type: 'input',
                    templateOptions: {
                        label: 'Tasa de interes de Credito Externo:',
                        disabled: disabled,
                        required: true
                    }
                },
            ];

            return fields;

        };

        var service = {
            getFormFields: getFormFields
        };

        return service;

    }

})();
