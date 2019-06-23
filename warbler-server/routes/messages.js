const express = require('express');
const router = express.Router({ mergeParams: true });

const {
	createMessage,
	getMessage,
	deleteMessage
} = require('../handlers/messages');

// prefix - /api/users/:id/messages
// when there is a post, call createMessage
router.route('/').post(createMessage);

// prefix - /api/users/:id/messages/:message_id
// when there is a x, call x
router
	.route('/:message_id')
	.get(getMessage)
	.delete(deleteMessage);

module.exports = router;
