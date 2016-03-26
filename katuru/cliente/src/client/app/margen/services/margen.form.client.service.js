(function() {
    'use strict';

    angular
        .module('app.margen')
        .factory('MargenForm', factory);

    function factory() {

        var getFormFields = function(disabled) {

            var fields = [
                {
                    key: 'Descripcion',
                    type: 'input',
                    templateOptions: {
                        label: 'Descripcion:',
                        disabled: disabled,
                        required: true
                    }
                },
                {
                    key: 'margen',
                    type: 'input',
                    templateOptions: {
                        label: 'Margen:',
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
