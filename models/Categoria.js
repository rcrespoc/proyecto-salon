const { model, Schema } = require('mongoose');

const categoriaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  }
})

categoriaSchema.methods.toJSON = function(){
  const {_id, __v, ...categoria} = this.toObject();
  return {
    ...categoria,
    uid: _id
  }
}

module.exports = model('Categoria', categoriaSchema);