const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    comments: { type: String, required: false, minlength: 2, maxlength: 255 }, 
    replies: { type: String, required: false, minlength: 2, maxlength: 255 },

});



const Video = mongoose.model('Video', videoSchema);








module.exports = Video;