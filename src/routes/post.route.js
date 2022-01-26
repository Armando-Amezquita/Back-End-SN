const { Router } =require('express');
const router = Router();

//controller
const { postPublicaciones, UpdatePost, publicacionesXusuario } =require('../controllers/post.controller');
const { isAuth } = require('../controllers/usuario.middlewares');
const { getPosts } = require('../controllers/post.controller')

//routes
router.get('/', getPosts)
// router.get('/name/:name', userByName)
// router.get('/byId/:id', userById)
router.post('/', isAuth, postPublicaciones)
// router.delete('/delete/:id', isAuth, deleteUser)
router.put('/update', isAuth, UpdatePost)
router.get('/varios', isAuth, publicacionesXusuario)

module.exports = router