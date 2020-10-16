const mongoose = require("mongoose");
 

const comment_schema= new mongoose.Schema({
    username:{
        type:String,
        required:'username is required',
    },
    content:{
        type:String,
        required:'content is required',
    },
    post:{
        type:mongoose.Types.ObjectId,
        ref:'Article',
        required:'post is required',
    }
})

const Comment = mongoose.model('Comment', comment_schema)

module.exports = Comment;