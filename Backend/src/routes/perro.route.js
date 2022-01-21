const { Router } =require('express');
const router = Router();

//controller
const { hola } =require('../controllers/perro.controller')


//routes
router.get('/hola', hola)


module.exports = router