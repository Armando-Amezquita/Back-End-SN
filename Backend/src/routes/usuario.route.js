require('dotenv').config()
const { Router } = require('express');
const router = Router();

//controller
const { usersAll, userByName,userById, postUser, deleteUser, Updateuser,  authorization} =require('../controllers/usuario.controller');


//routes
// router.get('/login', login);
router.get('/', usersAll);
router.get('/:name', userByName);
router.get('/Id/:id', userById);
router.post('/auth', authorization)
router.post('/', postUser); 
router.delete('/:id', deleteUser);
router.put('/:id', Updateuser)



module.exports = router