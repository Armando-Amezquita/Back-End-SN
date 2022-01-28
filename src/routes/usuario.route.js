const { Router } = require('express');
const router = Router();

//controller
const {isAuth} = require('../controllers/usuario.middlewares')
const { usersAll, userByName,userById, postUser, deleteUser, Updateuser, FollowMe, notificationFollow } =require('../controllers/usuario.controller')


//routes
// router.get('/login', login);
router.get('/', isAuth, usersAll);
router.get('/:name', isAuth, userByName);
router.get('/Id/:id', isAuth, userById);
router.post('/', postUser); 
router.delete('/:id', isAuth, deleteUser);
router.put('/', isAuth, Updateuser);
router.put('/follow', isAuth, FollowMe);




module.exports = router