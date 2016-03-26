(function() {
    'use strict';

    angular
        .module('app.cate')
        .factory('CateForm', factory);

    function factory() {

        var getFormFields = function(disabled) {

            var fields = [
                {
                    key: 'descripcion',
                    type: 'input',
                    templateOptions: {
                        label: 'descripcion:',
                        required: true
                    }
                }
                ,
                {
                    key: 'establecimiento',
                    type: 'input',
                    templateOptions: {
                        label: 'establecimiento:',
                        required: true,
                        disabled: true
                    }
                },
                {
                    key: 'idE',
                    type: 'input',
                    templateOptions: {
                        label: 'idE:',
                        required: true
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
