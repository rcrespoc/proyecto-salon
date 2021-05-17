const {Router} = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, editarCategoria, obtenerCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria, existeIdCategoria } = require('../helpers');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();

router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio')
    .trim()
    .notEmpty()
    .escape()
    .custom(existeCategoria),
  validarCampos
], crearCategoria)

router.get('/', obtenerCategorias)

router.get('/:id', obtenerCategoria)

router.put('/:id', [
  validarJWT,
  check('id', 'No es un ID válido')
  .isMongoId()
  .custom(existeIdCategoria),
  check('nombre', 'El nombre es obligatorio')
  .escape()
    .trim()
    .notEmpty()
    .custom(existeCategoria),
  validarCampos
], editarCategoria)

router.delete('/:id', [
  validarJWT,
  check('id', 'No es un ID válido')
  .isMongoId()
  .custom(existeIdCategoria),
  validarCampos
], borrarCategoria)

module.exports = router;