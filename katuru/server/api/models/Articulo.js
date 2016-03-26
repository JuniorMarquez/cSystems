/**
* Articulo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
titulo:'string',
barcode:'string',
descripcion:'string',

stockMinimo:'float',
existencia:'float',
precioCosto:'float',
precioBase:'float',


ubicacionFisica:'string',
serial:'string',
marca:'string',
modelo:'string',
presentacion:'string',
dimensiones:'string',
peso:'float',
idU:'string',
idE:'string' 
  }
};

