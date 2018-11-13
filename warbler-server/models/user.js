const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl:{
        type: String
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
});

// modify password to be encrypted
// adding hook to user schema
userSchema.pre("save", async function(next){
    try{
        // if user did not mod password
        if(!this.isModified("password")){
            return next();
        }
        // take the User password, 
        // salt of 10
        // bcrypt is async function, await for it to finish
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    }
    catch (err){
        return next(err);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword, next){
    try{
        let isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    }
    catch(err){
        return next(err);
    }
}

const User = mongoose.model("User", userSchema);
// "User"- model to refernce as
// userSchema - schema that you want to use
module.exports = User;
