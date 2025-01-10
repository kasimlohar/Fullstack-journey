const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from : {
        type: String,
        required: true,
    },
    to : {
        type: String,
        required: true,
    },
    message : {
        type: String,
        maxlength: 50,
    },
    created_at : {
        type: Date,
        default: Date.now,
        required : true,
    }
});


const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
