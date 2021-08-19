const mongoose = require('mongoose');
const Joi = require('joi');


const replySchema = new mongoose.Schema({
    replyText:{ type: String, required: true, minLength: 2, maxLength: 255 },

});

const commentSchema = new mongoose.Schema({
    commentText: { type: String, required: true, minLength: 2, maxLength: 255 }, 
    replies : [{type: replySchema}]
});





const Comment = mongoose.model('Comment', commentSchema);
const Reply = mongoose.model('Reply', replySchema);

function validateComment(comment){
    const schema = Joi.object({
        commentText: Joi.string().min(2).max(255).required(),
        replies: Joi.array(),
    });
    return schema.validate(comment);
}

function validateReply(reply){
    const schema = Joi.object({
        replyText: Joi.string().min(2).max(255).required(),
    });
    return schema.validate(reply);
}


              
module.exports = {
    Reply : Reply,
    Comment : Comment,
    validateComment : validateComment,
    validateReply : validateReply
}