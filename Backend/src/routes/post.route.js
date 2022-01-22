const { Router } =require('express');
const router = Router();

//controller
const { postPublicaciones, UpdatePost, publicacionesXusuario, listaPelis } =require('../controllers/post.controller')


//routes
router.post('/create', postPublicaciones)
router.put('/update', UpdatePost)
router.get('/varios/:id', publicacionesXusuario)
router.get('/uno', listaPelis)


module.exports = router