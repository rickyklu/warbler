const keys = require('../config/keys');
const mongoose = require('mongoose');

// allows you to see mongo queries in terminal
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(keys.mongoUri, {
	keepAlive: true
});

module.exports.User = require('./user');
module.exports.Message = require('./message');
