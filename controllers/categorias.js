const { request, response } = require('express');
const { Categoria } = require('../models');

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  try {
    const categoria = new Categoria({nombre})
    console.log(categoria)
    await categoria.save();
    res.json({
      msg: 'Categoria creada exitosamente',
      categoria
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}

const obtenerCategorias = async(req = request, res = response) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}

const editarCategoria = async(req = request, res = response) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();
  try {
    const data = {
      nombre
    }
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});
    res.json({
      msg: 'Categoria actualizada',
      categoria
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}

const obtenerCategoria = async(req = request, res = response) => {
  const { id } =  req.params;
  try {
    const categoria = await Categoria.findById(id);
    res.json(categoria)
  } catch (error) {
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}

const borrarCategoria = async(req = request, res = response) => {
  const { id } = req.params;
  try {
    await Categoria.findByIdAndDelete(id);
    res.json({
      msg: 'Borrado exitosamente.'
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor.'
    })
  }
}
module.exports = { 
  crearCategoria,
  obtenerCategorias,
  editarCategoria,
  obtenerCategoria,
  borrarCategoria
}