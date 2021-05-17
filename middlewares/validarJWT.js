const { request, response } = require('express');
const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if(!token){
    return res.status(401).json({
      msg: 'No hay token en la petición.'
    })
  }
  try {
    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findById(uid);
    req.usuario = usuario;
    if(!usuario){
      return res.status(401).json({
        msg: 'Token no válido - usuario no existente.'
      })
    }

    next();
  } catch (error) {
    res.status(401).json({
      msg: 'Token no válido.'
    })
  }
}

module.exports = {
  validarJWT
}