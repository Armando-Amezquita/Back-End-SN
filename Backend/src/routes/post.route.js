const { Router } =require('express');
const router = Router();

//controller
const { postPublicaciones, UpdatePost, publicacionesXusuario } =require('../controllers/post.controller')


//routes
// router.get('/all', usersAll)
// router.get('/name/:name', userByName)
// router.get('/byId/:id', userById)
router.post('/create', postPublicaciones)
// router.delete('/delete/:id', deleteUser)
router.put('/update', UpdatePost)
router.get('/varios', publicacionesXusuario)

module.exports = router