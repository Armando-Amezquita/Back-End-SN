const express =require ('express');
const server = express();

//IMPORTACION DE RUTAS
const usuarioRoute =require('./usuario.route')
const postRoute =require('./post.route')


//USO DE RUTAS

server.use('/usuarios', usuarioRoute)
server.use('/publicaciones', postRoute)

module.exports = server