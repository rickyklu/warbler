const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise; //uses native ES6 promises to avoid using callback patterns and use async functions
mongoose.connect("mongodb://127.0.0.1:27017/warbler", {
    //keepAlive: true,
    useNewUrlParser: true
});
console.log(mongoose.connection.readyState);

module.exports.User = require("./user");
module.exports.Message = require("./message");
