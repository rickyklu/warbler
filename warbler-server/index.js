require("dotenv").config();
const express = require("express")
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const PORT = 8081;


app.use(cors());
app.use(bodyParser.json());

// routes here
app.use("/api/auth", authRoutes);
app.use(
    "/api/users/:id/messages", 
    loginRequired, 
    ensureCorrectUser, 
    messagesRoutes
);

// get messages route
app.get("/api/messages", loginRequired, async function(req, res, next){
    try{
        // get messages as a timeline
        // and get username + profile pic to display
        let messages = await db.Message.find()
            .sort({ createdAt: "desc" })
            .populate("user",{
                username: true,
                profileImageUrl: true
            });
        return res.status(200).json(messages);
    } catch(err){
        return next(err);
    }
});

app.use(function(req,res,next){
    let err = new Error("Not found.");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server is starting on port ${PORT}`);
});
