const express =require ('express');
const server = express();
const jwt = require('jsonwebtoken')
//IMPORTACION DE RUTAS
const usuarioRoute =require('./usuario.route')
const postRoute =require('./post.route')


//USO DE RUTAS

server.use('/usuarios', usuarioRoute)
server.use('/posts', postRoute)

module.exports = server