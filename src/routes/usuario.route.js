const { Router } = require('express');
const router = Router();

//controller
const {isAuth} = require('../controllers/usuario.middlewares')
const { usersAll, userByName,userById, postUser, deleteUser, Updateuser, FollowMe, notification, UpdateProfile, UpdateBackgroundPicture, getNotification, deleteNotification } =require('../controllers/usuario.controller')
const { uploadP, uploadb, uploadpo } =require('../controllers/upload.controller')


//routes
// router.get('/login', login);
router.delete('/notifications', isAuth, deleteNotification);
router.get('/notifications', isAuth, getNotification);
router.get('/:name', isAuth, userByName);
router.get('/', isAuth, usersAll);
router.get('/Id/:id', isAuth, userById);
router.post('/', postUser); 
router.delete('/:id', isAuth, deleteUser);
router.put('/', isAuth, Updateuser);
router.put('/updateProfile', isAuth,uploadP, UpdateProfile);
router.put('/updateBackPicture', isAuth,uploadb, UpdateBackgroundPicture);
router.put('/updatePostPicture', isAuth,uploadpo, UpdateProfile);
router.put('/follow', isAuth, FollowMe);
// router.get('/notification', isAuth, notification);

// router.post('/notification', isAuth, notificationDelete);




module.exports = router