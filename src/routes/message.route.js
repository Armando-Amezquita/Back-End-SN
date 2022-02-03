const router = require("express").Router();
const {newMessage} = require('../controllers/message.controller')
//ADD
router.post("/", newMessage);

//GET
router.get("/:conversationId");

module.exports = router;