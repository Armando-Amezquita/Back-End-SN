require('dotenv').config()
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const router = Router();

//controller
const { usersAll, userByName,userById, postUser, deleteUser, Updateuser,  } =require('../controllers/usuario.controller');
const usuarioModel = require('../models/usuario.model');


//routes
// router.get('/login', login);
router.get('/', usersAll);
router.get('/:name', userByName);
router.get('/Id/:id', userById);
router.post('/auth', async(req, res, next)=>{
    try {
        
        const {id} = req.body;
        const user = await usuarioModel.findById(id)
        if(req.query.token){
            try {
                const verficacion = jwt.verify(req.query.token, process.env.SECRET_KEY)
                return res.json({...verficacion, data: true})
            } catch (error) {
                console.log(error)
                return res.json({...error, data: false})
                
            }
        }
        if(user){
            const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn="1d"})
            return res.json({message: `Se ha generado el token para ${user.name}`, data: token})
        }
        res.json({message: "El usuario no existe"})
    } catch (error) {
        console.log(error)
        res.send(error)    
    }
})
router.post('/', postUser); 
router.delete('/:id', deleteUser);
router.put('/:id', Updateuser)



module.exports = router