(function() {
    'use strict';

    angular
        .module('app.articulo')
        .factory('ArticuloForm', factory);

    function factory() {

        var getFormFields = function(disabled) {

            var fields = [
              {
                    key: 'titulo',
                    type: 'input',
                    templateOptions: {
                        label: 'Titulo:',
                        required: true
                    }
                },
                {
  type: 'textarea',
  key: 'descripcion',
  templateOptions: {
    label: 'Descripcion',
    rows: 4,
    cols: 15
  }
},
                {
                    key: 'marca',
                    type: 'input',
                    templateOptions: {
                        label: 'Marca:'
                    }
                },
                 {
                    key: 'modelo',
                    type: 'input',
                    templateOptions: {
                        label: 'Modelo:'
                    }
                },
                 {
                    key: 'serial',
                    type: 'input',
                    templateOptions: {
                        label: 'Serial:'
                    }
                },
                 {
                    key: 'precioCosto',
                    type: 'input',
                    templateOptions: {
                        label: 'Precio de Costo:'
                    }
                },
                 {
                    key: 'stockMinimo',
                    type: 'input',
                    templateOptions: {
                        label: 'Stock Minimo:'
                    }
                },
                 {
                    key: 'dimensiones',
                    type: 'input',
                    templateOptions: {
                        label: 'Dimensiones:'
                    }
                },
                 {
                    key: 'peso',
                    type: 'input',
                    templateOptions: {
                        label: 'Peso:',
                        type: 'number'
                    }
                },
                 {
                    key: 'fechaActualizacion',
                    type: 'input',
                    templateOptions: {
                        label: 'Fecha de Actualizacion:'
                    }
                },
               
                 {
                    key: 'presentacion',
                    type: 'input',
                    templateOptions: {
                        label: 'Presentacion:'
                    }
                },
                 {
                    key: 'barcode',
                    type: 'input',
                    templateOptions: {
                        label: 'Código de barras:'
                    }
                },

                {
                    key: 'idU',
                    type: 'input',
                    templateOptions: {
                        label: 'Identificador de usuario:',
                        disabled: true
                    }
                },
                 {
                    key: 'idE',
                    type: 'input',
                    templateOptions: {
                        label: 'Identificador de establecimiento:',
                        disabled: true
                    }
                },
                 {
                    key: 'idP',
                    type: 'input',
                    templateOptions: {
                        label: 'Identificador de proveedor:',
                        disabled: true
                    }
                },
                 {
                    key: 'idDeposito',
                    type: 'input',
                    templateOptions: {
                        label: 'Identificador de depósito:',
                        disabled: true
                    }
                },
                 {
                    key: 'idSucursal',
                    type: 'input',
                    templateOptions: {
                        label: 'Identificador de Sucursal:',
                        disabled: true
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
