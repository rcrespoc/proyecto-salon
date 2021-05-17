const {request, response} = require('express');
const {Usuario} = require('../models');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');


const login = async(req = request, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({email});
    if(!usuario){
      return res.status(400).json({
        msg: 'Usuario o contraseña incorrectos.'
      })
    }
    const validarPassword = bcryptjs.compareSync(password, usuario.password);
    if(!validarPassword){
      return res.status(400).json({
        msg: 'Usuario o contraseña incorrectos.'
      })
    }
    const token = await generarJWT(usuario._id);

    res.json({
      usuario,
      token
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor'
    })
  }
}
const register = async(req = request, res = response) => {
  const { email, password, nombre, apellidos, DNI, telefono, direccion, rol } = req.body;
  try {
    const usuario = new Usuario({email, password, nombre, apellidos, DNI, telefono, direccion, rol});
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    res.json({
      msg: 'Usuario registrado.',
      usuario
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor',
      error
    })
  }
}
const obtenerUsuarios = async(req = request, res = response) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor',
      error
    })
  }
}

const editarUsuario = async(req = request, res = response) => {
  const { id } = req.params;
  const { password, ...resto } = req.body;
  try {
    if(password){
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true})
    res.json({
      msg: 'Editado exitosamente.',
      usuario
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor'
    })
  }
}

const obtenerUsuario = async(req = request, res = response) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findById(id);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({
      msg: 'Contacte con el administrador del servidor',
    })
  }
}

module.exports = {
  login,
  register,
  obtenerUsuario,
  obtenerUsuarios,
  editarUsuario
}