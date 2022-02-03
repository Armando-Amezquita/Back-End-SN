const router = require("express").Router();
const {newMessage, getMessages} = require('../controllers/message.controller')
//ADD
router.post("/", newMessage);

//GET
router.get("/:conversationId", getMessages);

module.exports = router;