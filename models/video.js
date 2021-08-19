const mongoose = require('mongoose');




const commentsSchema = new mongoose.Schema({
    comments: { type: String, required: false, minlength: 2, maxlength: 255 }, 
    
});

const repliesSchema = new mongoose.Schema({
    replies: { type: String, required: false, minlength: 2, maxlength: 255 },

});


const Comment = mongoose.model('Comment', commentsSchema);
const Replies = mongoose.model('Replies', repliesSchema);




              



module.exports = Comment;
module.exports = Replies;