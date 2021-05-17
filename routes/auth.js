const {Router} = require('express');
const { login, register, obtenerUsuarios, editarUsuario, obtenerUsuario } = require('../controllers/auth');
const { check } = require('express-validator');
const { emailExiste, equalsPassword, rolExiste, existeUsuarioId, esMismoUsuario } = require('../helpers');
const { validarCampos, validarJWT } = require('../middlewares');

const router = Router();
router.post('/login', [
  check('email', 'El correo no es válido').isEmail(),
  check('password', 'El password es obligatorio').notEmpty(),
  validarCampos
], login)

router.post('/register', [
  check('email', 'El correo es obligatorio')
    .trim()
    .notEmpty()
    .escape(),
  check('email', 'El correo no es válido')
    .isEmail()
    .custom(emailExiste),
  check('nombre', 'El nombre es obligatorio')
    .trim()
    .notEmpty()
    .escape(),
  check('apellidos', 'El apellido es obligatorio')
    .trim()
    .notEmpty()
    .escape(),
  check('DNI', 'El DNI es obligatorio')
    .trim()
    .notEmpty()
    .escape(),
  check('DNI','El DNI debe tener únicamente 8 dígitos').isLength({min: 8, max: 8}),
  check('telefono', 'El teléfono es obligatorio')
    .trim()
    .escape()
    .notEmpty(),
  check('direccion', 'La dirección es obligatoria')
    .trim()
    .notEmpty()
    .escape(),
  check('rol', 'El rol es obligatorio')
    .trim()
    .notEmpty()
    .escape()
    .custom(rolExiste),
  check('password', 'El password es obligatorio').trim().notEmpty(),
  check('password', 'El password debe tener al menos 8 dígitos').trim().isLength({min: 8}),
  check('confirmar', 'El password es obligatorio').trim().notEmpty(),
  check('confirmar', 'Ambas contraseñas deben ser iguales').trim().custom(equalsPassword),
  validarCampos
], register);

router.get('/', [
  validarJWT,
  validarCampos
], obtenerUsuarios)

router.get('/:id', [
  validarJWT,
  validarCampos
], obtenerUsuario)

router.put('/:id', [
  validarJWT,
  check('id').isMongoId(),
  check('id').custom(existeUsuarioId).custom(esMismoUsuario),
  validarCampos
], editarUsuario)
module.exports = router;