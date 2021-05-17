const { existeCategoria } = require('../helpers');
const { Producto } = require('../models')

const crearProducto = async (req, res) => {
  const {nombre, precio, categoria} = req.body;
  const data = {
    nombre: nombre.toUpperCase(),
    precio,
    categoria
  }
  try {
    const producto = new Producto(data);
    await producto.save();
    res.status(201).json({
      msg: 'Producto guardado exitosamente',
      producto
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}

const obtenerProductos = async(req, res) => {
  try {
    const productos = await Producto.find().populate('categoria');
    res.json(productos);
  } catch (error) {
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}

const obtenerProducto = async(req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id).populate('categoria');
    res.json(producto);
  } catch (error) {
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}

const editarProducto = async(req, res) => {
  const { id } = req.params;
  const { nombre, precio, categoria } = req.body;
  try {
    const data = { 
      nombre: nombre.toUpperCase(),
      precio, 
      categoria
    }
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true}).populate('categoria');
    res.json({
      msg: 'Actualizado correctamente',
      producto
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}

const eliminarProducto = async(req, res) => {
  const { id } = req.params;
  try {
    await Producto.findByIdAndDelete(id);
    res.json({
      msg: 'Eliminado correctamente'
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  editarProducto,
  eliminarProducto
}