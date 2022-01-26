const { Router } = require('express');
const router = Router();

//controller
const {isAuth} = require('../controllers/usuario.middlewares')
const {uploadFile, multiple,uploadI, uploadM} =require('../controllers/upload.controller')

//routes
// router.post('/', upload)
router.post('/', uploadI,uploadFile)
router.post('/multiple', uploadM, multiple)




// ruta a los usuario que no sigo
// notificacion 

module.exports = router