const router = require("express").Router();
const { newReport, getReports, reports } = require('../controllers/reportes.contoller')

router.get("/", getReports);
router.post("/", newReport);
router.put("/", reports);


module.exports = router;