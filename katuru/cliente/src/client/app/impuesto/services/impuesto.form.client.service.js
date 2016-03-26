(function() {
    'use strict';

    angular
        .module('app.impuesto')
        .factory('ImpuestoForm', factory);

    function factory() {

        var getFormFields = function(disabled) {

            var fields = [
                {
                    key: 'descripcion',
                    type: 'input',
                    templateOptions: {
                        label: 'descripcion:',
                        disabled: disabled,
                        required: true
                    }
                },
                {
                    key: 'tasa',
                    type: 'input',
                    templateOptions: {
                        label: 'tasa:',
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
