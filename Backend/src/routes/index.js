const express =require ('express');
const server = express();

//IMPORTACION DE RUTAS
const usuarioRoute =require('./usuario.route')
<<<<<<< HEAD
const perroRoute = require('./perro.route')

//USO DE RUTAS
server.use('/usuario', usuarioRoute)
server.use('/perro', perroRoute)


=======
const postRoute =require('./post.route')


//USO DE RUTAS

server.use('/usuario', usuarioRoute)
server.use('/publicaciones', postRoute)
>>>>>>> f315419945c79fe3abdd7874f17663246438ecf9

module.exports = server