const router = require("express").Router();
const { notificacionAdmin } = require('../controllers/reportes.contoller')

router.post("/", notificacionAdmin);


module.exports = router;