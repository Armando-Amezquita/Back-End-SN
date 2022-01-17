const express =require ('express');
const server = express();

//IMPORTACION DE RUTAS
const usuarioRoute =require('./usuario.route')

//USO DE RUTAS
server.get('/otro', (req, res, next)=>{
res.send('hola')
} )
server.use('/usuario', usuarioRoute)
module.exports = server