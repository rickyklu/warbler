const express = require("express");
// mergeParams allows getting access to ID of router
const router = express.Router({ mergeParams: true });
const { createMessage } = require("../handlers/messages");

// prefix - api/users/:id/messages
router.route("/").post(createMessage);

module.exports = router;
