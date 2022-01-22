const express =require ('express');
const server = express();
const jwt = require('jsonwebtoken')
//IMPORTACION DE RUTAS
const usuarioRoute =require('./usuario.route')
const postRoute =require('./post.route')


//USO DE RUTAS
server.get('/', (req, res, next)=>{
    try {
        if(req.query.token){
            const decoded = jwt.verify(req.query.token, 'secret-llave123')
            return res.json(decoded)
        }
        const token =  jwt.sign({id: 'dfasdfsdfasdfasdfasdf', msg: 'este es u mensaje'}, 'secret-llave123', {expiresIn: '3m'})
        res.json(token)
    } catch (error) {
        res.json(error)
    }

})

server.use('/usuarios', usuarioRoute)
server.use('/posts', postRoute)

module.exports = server