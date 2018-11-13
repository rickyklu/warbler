const db = require("../models/index");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next){
    // find a user
    try{
        // check if pass matches
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImageUrl } = user;
        // if it matches...
        let isMatch = await user.comparePassword(req.body.password);
        // ...log them in
        if(isMatch){
            let token = jwt.sign(
                {
                    id,
                    username,
                    profileImageUrl
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Incorrect email/pass"
            });
        }
    }
    catch (e) {
    return next({ status: 400, message: "Invalid Email/Password." });
  }
    
    // checking if 
}

exports.signup = async function(req, res, next){
    try{
        let user = await db.User.create(req.body);
        let { id, username, profileImageUrl } = user;
        let token = jwt.sign(
      {
        id,
        username,
        profileImageUrl
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
        return res.status(200).json({
            id,
            username,
            profile,
            token
        });
        // create atoken (signing a token)
        // process.env.SECRET_KEY
    }
    catch(err){
        // see what kind of error
        // if certain error, respond w/ username/email taken
        if (err.code === 11000){
            err.message = "Sorry, that username/email is taken."
        }
        // otherwise send generic 400
        return next({
            status: 400,
            message: err.message
        });
    }
}
