const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{
  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.path = {
      auth: '/api/auth',
      categoria: '/api/categoria',
      producto: '/api/producto'
    }
    this.middlwares();
    this.routes();
    this.conectarDB();
  }

  middlwares(){
    this.app.use(express.json());
    this.app.use(cors())
  }

  async conectarDB(){
    await dbConnection();
  }

  routes(){
    this.app.use(this.path.auth, require('../routes/auth'));
    this.app.use(this.path.categoria, require('../routes/categoria'));
    this.app.use(this.path.producto, require('../routes/producto'));
  }
  listen(){
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo', this.port);
    })
  }
}

module.exports = Server;