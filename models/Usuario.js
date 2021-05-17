const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
  email: {
    type: String,
    required: [true, 'El email es obligatorio.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria.']
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio.']
  },
  apellidos: {
    type: String,
    required: [true, 'El apellido es obligatorio.']
  },
  DNI: {
    type: String,
    required: [true, 'El DNI es obligatorio']
  },
  telefono: {
    type: String,
    required: [true, 'El telefono es obligatorio']
  },
  direccion: {
    type: String,
    required: [true, 'La dirección es obligatoria']
  },
  rol: {
    type: String,
    default: 'USER_ROL',
    enum: ['ADMIN_ROL', 'USER_ROL'],
    required: true
  }
})

UsuarioSchema.methods.toJSON = function(){
  const { __v, password, _id, ...usuario } = this.toObject();
  return {
    ...usuario,
    uid: _id
  }
}

module.exports = model('Usuario', UsuarioSchema);