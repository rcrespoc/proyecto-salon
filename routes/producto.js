const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, editarProducto, eliminarProducto } = require('../controllers/producto');
const { existeIdCategoria, existeProducto, existeProductoId } = require('../helpers');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();

router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio')
    .trim()
    .escape()
    .notEmpty()
    .custom(existeProducto),
  check('categoria', 'Debe proveer un ID válido')
    .trim()
    .escape()
    .notEmpty()
    .isMongoId()
    .custom(existeIdCategoria),
  validarCampos
], crearProducto);

router.get('/', obtenerProductos);

router.get('/:id', [
  validarJWT,
  check('id', 'Debe proveer un ID válido')
  .isMongoId()
  .custom(existeProductoId),
  validarCampos
], obtenerProducto);

router.put('/:id', [
  validarJWT,
  check('id', 'Debe proveer un ID válido')
  .isMongoId()
  .custom(existeProductoId),
  check('nombre', 'El nombre es obligatorio')
    .trim()
    .escape()
    .notEmpty()
    .custom(existeProducto),
  check('categoria', 'Debe proveer un ID válido')
    .trim()
    .escape()
    .notEmpty()
    .isMongoId()
    .custom(existeIdCategoria),
  validarCampos
], editarProducto);

router.delete('/:id', [
  validarJWT,
  check('id', 'Debe proveer un ID válido')
  .isMongoId()
  .custom(existeProductoId),
  validarCampos
], eliminarProducto)

module.exports = router;