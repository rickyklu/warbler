require("dotenv").load();
const jwt = require("jsonwebtoken");

// make sure user is logged (authentication
exports.loginRequired = function(req, res, next){
    try {
        const token = req.headers.authorization.split(' ')[1]; // formatted as "Bearer [token]"
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded){
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Please log in first"
                });
            }
        }); 
    }
    catch(e){
        return next({
            status: 401,
            message: "Error: Please log in first"
        });
    }
}

// make sure we get correct user (authorization)
// url will be in format /api/users/:id/messages
exports.ensureCorrectUser = function(req, res, next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
           // if we get a token and the token id is the the same as the token in in the url...
            if(decoded && decoded.id === req.params.id){
            return next();
            } else {
                return next({
                    status: 401,
                    message: "Unauthorized"
                })
            }
        });
    }
    catch(e){
        return next({
            status: 401,
            message: "Unauthorized"
        })
    }
}

