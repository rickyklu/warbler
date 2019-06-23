const keys = require('../config/keys');
var jwt = require('jsonwebtoken');

exports.loginRequired = function(req, res, next) {
  try {
    // get the token header: format is in "Bearer [token_info]"
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, keys.secretKey, function(err, decoded) {
      if (decoded) {
        return next();
      } else {
        return next({ status: 401, message: 'Please Log In First' });
      }
    });
  } catch (e) {
    return next({ status: 401, message: 'Error - Please Log In First' });
  }
};

exports.ensureCorrectUser = function(req, res, next) {
  try {
    // get the token header: format is in "Bearer [token_info]"
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, keys.secretKey, function(err, decoded) {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({ status: 401, message: 'Unauthorized' });
      }
    });
  } catch (e) {
    return next({ status: 401, message: 'Error - Unauthorized' });
  }
};
