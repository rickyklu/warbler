const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true,
        maxLength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});


// problem with removing messages: need to delete reference
// between message and the user's message (solved with function below)
messageSchema.pre("remove", async function(next){
    try{
        // find user
        let user = await User.findbyId(this.user);
        // remove the ID of the message from their messages list
        user.message.remove(this.id);
        //save the user
        await user.save();
        return next();
    }
    catch(e){
        return next(err); 
    }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
