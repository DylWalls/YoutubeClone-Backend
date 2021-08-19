const {Comment, Reply, validateComment, validateReply} = require ("../models/comment");
const express = require("express");
const router = express.Router();


//Generic Get all
router.get('/', async (req, res) => {
    try {
      const comment = await Comment.find();
      return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`); 
  
    }
  });
  
  
  //Replying to Certain Comments
  router.get("/:commentsid", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.commentsid);
  
      if (!comment)
        return res.status(400).send(`The comment with id "${req.params.commentsid}" 
        does not exist.`);
  
      return res.send(comment);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  
  
  
  //Normal comment on video
  router.post("/", async (req, res) => {
    try {
      const { error } = validateComment(req.body);
      if (error) return res.status(400).send(error);
  
      const comment = new Comment({
        commentText: req.body.commentText,
        replies: [],
      });
  
      await comment.save();
  
      return res.send(comment);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });


  //Searching for Comment by ID
  router.put("/:commentsid", async (req, res) => {
    try {
      const { error } = validateComment(req.body);
      if (error) return res.status(400).send(error);
  
      const comment = await Comment.findByIdAndUpdate(
        req.params.commentsid,
        {
            comments: req.body.comments,
            replies: req.body.replies,
        },
        { new: true }
      );
      if (!comment)
        return res.status(400).send(`The comment with id "${req.params.id}" 
        does not exist.`);
  
      await comment.save();
  
      return res.send(comment);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  
  
  //Deletes Comments
  router.delete("/:commentsid", async (req, res) => {
    try {
  
      const comment = await Comment.findByIdAndRemove(req.params.commentsid);
      
      if (!comment)
        return res.status(400).send(`The comment with id "${req.params.commentsid}" 
        does not exist.`);
  
      return res.send(comment);
  
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });


  
  module.exports = router;