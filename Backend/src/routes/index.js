const express =require ('express');
const server = express();

//IMPORTACION DE RUTAS
const usuarioRoute =require('./usuario.route')
const perroRoute = require('./perro.route')

//USO DE RUTAS
server.use('/usuario', usuarioRoute)
server.use('/perro', perroRoute)



module.exports = server