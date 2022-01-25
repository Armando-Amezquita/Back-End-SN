const { Router } = require('express');
const router = Router();

//controller
const { usersAll, userByName,userById, postUser, deleteUser, Updateuser, authorization, FollowMe } =require('../controllers/usuario.controller')


//routes
// router.get('/login', login);
router.get('/', usersAll);
router.get('/:name', userByName);
router.get('/Id/:id', userById);
router.post('/', postUser); 
router.delete('/:id', deleteUser);
router.put('/:id', Updateuser)
router.put('/follow/:id', FollowMe)




module.exports = router