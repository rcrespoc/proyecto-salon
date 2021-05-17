const validarCampos = require('./validarCampos');
const validarJWT = require('./validarJWT');

module.exports = {
  ...validarCampos,
  ...validarJWT
}