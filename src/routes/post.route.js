const { Router } =require('express');
const router = Router();

//controller
const { postPublicaciones, UpdatePost, publicacionesXusuario, likePost, commentPost } =require('../controllers/post.controller');
const { isAuth } = require('../controllers/usuario.middlewares');
const { getPosts } = require('../controllers/post.controller');

//routes
router.get('/', getPosts)
// router.get('/name/:name', userByName)
// router.get('/byId/:id', userById)
router.post('/', isAuth, postPublicaciones)
// router.delete('/delete/:id', isAuth, deleteUser)
router.put('/update', isAuth, UpdatePost)
router.get('/varios', isAuth, publicacionesXusuario)
router.put('/likes', isAuth, likePost);
router.post('/comentarios', isAuth, commentPost)
// router.put('/comments', isAuth, getPutLike);



module.exports = router