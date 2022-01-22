const { Router } =require('express');
const router = Router();

//controller
const { postPublicaciones, UpdatePost, publicacionesXusuario } =require('../controllers/post.controller');
const postModel = require('../models/post.model');


//routes
router.post('/create', postPublicaciones)
// router.delete('/delete/:id', deleteUser)
router.put('/update', UpdatePost)
router.get('/varios', publicacionesXusuario)
router.get('/', async(req, res, next)=>{
    const posts = await postModel.find()
    res.send(posts)
})
module.exports = router