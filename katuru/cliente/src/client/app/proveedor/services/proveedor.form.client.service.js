(function() {
    'use strict';

    angular
        .module('app.proveedor')
        .factory('ProveedorForm', factory);

    function factory() {

        var getFormFields = function(disabled) {

            var fields = [
                {
                    key: 'nombreRazon',
                    type: 'input',
                    templateOptions: {
                        label: 'Nombre o Razon Social:'
                    }
                },
                {
                    key: 'cedulaRif',
                    type: 'input',
                    templateOptions: {
                        label: 'Cedula/Rif:'
                    }
                },
                {
                    key: 'tel1',
                    type: 'input',
                    templateOptions: {
                        label: 'Telefono 1:'
                    }
                },{
                    key: 'tel2',
                    type: 'input',
                    templateOptions: {
                        label: 'Telefono 2:'
                    }
                },{
                    key: 'direccion',
                    type: 'input',
                    templateOptions: {
                        label: 'Direccion:'
                    }
                },{
                    key: 'email',
                    type: 'input',
                    templateOptions: {
                        label: 'Email:'
                    }
                },{
                    key: 'fax',
                    type: 'input',
                    templateOptions: {
                        label: 'Fax:'
                    }
                },{
                    key: 'web',
                    type: 'input',
                    templateOptions: {
                        label: 'Direccion Web:'
                    }
                },{
                    key: 'idE',
                    type: 'input',
                    templateOptions: {
                        label: 'Identificado de Establecimiento:'
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
