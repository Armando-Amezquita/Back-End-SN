const express =require ('express');
const server = express();   

//IMPORTACION DE RUTAS
const usuarioRoute =require('./usuario.route')
const postRoute =require('./post.route')
const uploadRoute = require('./upload.route')


//USO DE RUTAS

server.use('/usuarios', usuarioRoute)
server.use('/posts', postRoute)
server.use('/upload', uploadRoute)

module.exports = server