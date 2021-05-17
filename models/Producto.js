const { model, Schema } = require('mongoose');

const productoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true
  },
  precio: {
    type: Number,
    default: 0
  },
  categoria: {
    type: Schema.Types.ObjectID,
    ref: 'Categoria',
    required: true
  }
})

productoSchema.methods.toJSON = function(){
  const {_id, __v, ...producto} = this.toObject();
  return {
    ...producto,
    uid: _id
  }
}

module.exports = model('Producto', productoSchema);