const { Usuario, Role, Categoria, Producto } = require('../models')

const emailExiste = async(email) => {
  const existeEmail = await Usuario.findOne({email});
  if(existeEmail){
    throw new Error(`El correo ${email} ya está en uso.`)
  }
}

const equalsPassword = (confirmar, {req}) => {
  const {password} = req.body;
  return confirmar === password;
}

const rolExiste = async(rol) => {
  const existeRol = await Role.findOne({rol});
  if(!existeRol){
    throw new Error(`El ${rol} que busca no existe`);
  }
}

const existeCategoria = async(categoria) => {
  const existeCategoria = await Categoria.findOne({nombre: categoria.toUpperCase()});
  if(existeCategoria){
    throw new Error(`Ya existe una categoria con el nombre: ${categoria}`);
  }
}

const existeProducto = async(producto, {req}) => {
  const existeProducto = await Producto.findOne({nombre: producto.toUpperCase()});
  if(existeProducto && existeProducto._id != req.params.id){
    throw new Error(`Ya existe un producto con el nombre: ${producto}`);
  }
}

const existeIdCategoria = async(id) => {
  const existeCategoria = await Categoria.findById(id);
  if(!existeCategoria){
    throw new Error(`La categoría con el ID ${id} no existe`);
  }
}

const existeUsuarioId = async(id) => {
  const existeUsuario = await Usuario.findById(id);
  if(!existeUsuario){
    throw new Error(`El usuario con el ID ${id} no existe`)
  }
}
const existeProductoId = async(id) => {
  const existeProducto = await Producto.findById(id);
  if(!existeProducto){
    throw new Error(`El producto con el ID ${id} no existe`)
  }
}

const esMismoUsuario = async(id, {req}) => {
  const { _id } = req.usuario;
  if(_id != id){
    throw new Error('Usted no tiene permisos para actualizar este usuario')
  }
}

module.exports = {
  emailExiste,
  equalsPassword,
  rolExiste,
  existeCategoria,
  existeIdCategoria,
  existeUsuarioId,
  esMismoUsuario,
  existeProducto,
  existeProductoId
}