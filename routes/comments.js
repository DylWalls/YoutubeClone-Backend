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
  router.get("/:commentsId", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.commentsId);
  
      if (!comment)
        return res.status(400).send(`The comment with id "${req.params.commentsId}" 
        does not exist.`);
  
      return res.send(comment);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

  
  //Normal comment on video
  router.post("/", async (req, res) => {
    try {
      const comments = await Comment.find();
      const { error } = validateComment(req.body);
      if (error) return res.status(400).send(error);
  
      const comment = new Comment({
        userName: req.body.userName,
        commentText: req.body.commentText,
        like: req.body.like,
        dislike: req.body.dislike,
        replies: [],
      });
  
      await comment.save();
  
      return res.send(comments);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

    // Posting Reply to Specific Comment
    router.post("/:commentId", async (req, res) => {
      try {
        const comment = await Comment.findById(req.params.commentId);
        const { error } = validateReply(req.body);
        if (error) return res.status(400).send(error);
    
        const reply = new Reply({
          replyText: req.body.replyText,
        });
        comment.replies.push(reply)
        await comment.save();
    
        return res.send(comment);
      } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
      }
    });


  //Searching for Comment by ID
  router.put("/:commentsId", async (req, res) => {
    try {
      const { error } = validateComment(req.body);
      if (error) return res.status(400).send(error);
  
      const comment = await Comment.findByIdAndUpdate(
        req.params.commentsId,
        {
            commentText: req.body.commentText,
            replyText: req.body.replyText,
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
  router.delete("/:commentsId", async (req, res) => {
    try {
  
      const comment = await Comment.findByIdAndRemove(req.params.commentsId);
      
      if (!comment)
        return res.status(400).send(`The comment with id "${req.params.commentsId}" 
        does not exist.`);
  
      return res.send(comment);
  
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });


  
  module.exports = router;