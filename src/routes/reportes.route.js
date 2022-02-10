const router = require("express").Router();
const { newReport, getReports, reports, cleanReports } = require('../controllers/reportes.contoller')

router.get("/", getReports);
router.post("/", newReport);
router.put("/", reports);
router.delete("/:iduser", cleanReports)


module.exports = router;