(function() {
    'use strict';

    angular
        .module('app.cliente')
        .factory('ClienteForm', factory);

    function factory() {

        var getFormFields = function(disabled) {

            var fields = [
                {
                    key: 'nombreRazon',
                    type: 'input',
                    templateOptions: {
                        label: 'Nombre o Razón Social:',
                        disabled: disabled,
                        required: true
                    }
                },
                {
                    key: 'cedulaRif',
                    type: 'input',
                    templateOptions: {
                        label: 'Cedula de Identidad / Rif:',
                        disabled: disabled
                    }
                },
                 {
                    key: 'direccion',
                    type: 'input',
                    templateOptions: {
                        label: 'Direccion:',
                        disabled: disabled
                    }
                },
                {
                    key: 'telefono',
                    type: 'input',
                    templateOptions: {
                        label: 'Telefono:',
                        disabled: disabled
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
