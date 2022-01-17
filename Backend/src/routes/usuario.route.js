const { Router } =require('express');
const router = Router();

//controller
const { usersAll, userByName,userById, postUser, deleteUser, Updateuser } =require('../controllers/usuario.controller')


//routes
router.get('/all', usersAll)
router.get('/name/:name', userByName)
router.get('/byId/:id', userById)
router.post('/create', postUser)
router.delete('/delete/:id', deleteUser)
router.put('/update/:id', Updateuser)
module.exports = router