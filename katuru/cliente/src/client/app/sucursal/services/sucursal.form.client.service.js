(function() {
    'use strict';

    angular
        .module('app.sucursal')
        .factory('SucursalForm', factory);

    function factory() {

        var getFormFields = function(disabled) {

            var fields = [
                {
                    key: 'idE',
                    type: 'input',
                    templateOptions: {
                        label: 'Identificador de Establecimiento:',
                        required: true
                    }
                },
                {
                    key: 'descripcion',
                    type: 'input',
                    templateOptions: {
                        label: 'Descripcion:'
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
