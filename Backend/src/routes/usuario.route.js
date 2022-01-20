const { Router } = require('express');
const router = Router();

//controller
const { usersAll, userByName,userById, postUser, deleteUser, Updateuser, login } =require('../controllers/usuario.controller')


//routes
router.get('/login', login);
router.get('/', usersAll);
// router.get('/userName/:userName', userByNameAndById);
router.get('/:name', userByName);
router.get('/Id/:id', userById);
router.post('/', postUser); 
// router.delete('/:id || :name', deleteUser)
router.delete('/:id', deleteUser);
router.put('/:id', Updateuser)


module.exports = router