const { Router } = require('express');
const router = Router();

//controller
const {isAuth} = require('../controllers/usuario.middlewares')
const { usersAll, userByName,userById, postUser, deleteUser, Updateuser, FollowMe, uploadI, notification,  } =require('../controllers/usuario.controller')


//routes
// router.get('/login', login);
router.get('/', isAuth, usersAll);
router.get('/:name', isAuth, userByName);
router.get('/Id/:id', isAuth, userById);
router.post('/', postUser); 
router.delete('/:id', isAuth, deleteUser);
router.put('/', isAuth,uploadI, Updateuser);
router.put('/follow', isAuth, FollowMe);
router.get('/notification', isAuth, notification);
// router.post('/notification', isAuth, notificationDelete);




module.exports = router