const express = require("express");
const { Reply, validateReply } = require("../models/comment");
const router = express.Router();


// Normal Get
// Find Reply by ID
// Add Reply to CommentID
// Delete Reply
// 
// Generic Get All
router.get('/', async (req, res) => {
    try {
      const replies = await Reply.find();
      return res.send(replies);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`); 
  
    }
  });
  
  
  
  // Get Specific Replies
  router.get("/:repliesid", async (req, res) => {
    try {
      const reply = await Reply.findById(req.params.repliesid);
  
      if (!reply)
        return res.status(400).send(`The reply with id "${req.params.repliesid}" 
        does not exist.`);
  
      return res.send(reply);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  }); 


// Putting Reply on specific comments
  router.put("/:repliesid", async (req, res) => {
    try {
      const { error } = validateReply(req.body);
      if (error) return res.status(400).send(error);
  
      const reply = await Reply.findByIdAndUpdate(
        req.params.repliesid,
        {
            commentText: req.body.commentText,
            replyText: req.body.replyText,
        },
        { new: true }
      );
      if (!reply)
        return res.status(400).send(`The reply with id "${req.params.id}" 
        does not exist.`);
  
      await reply.save();
  
      return res.send(reply);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

  // Posting Reply to Specific Comment
  router.post("/:repliesid", async (req, res) => {
    try {
      const { error } = validateReply(req.body);
      if (error) return res.status(400).send(error);
  
      const reply = new Reply({
        commentText: req.body.commentText,
        replyText: req.body.replyText,
      });
  
      await reply.save();
  
      return res.send(reply);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

// Reply Delete
  router.delete("/:repliesid", async (req, res) => {
    try {
  
      const reply = await Reply.findByIdAndRemove(req.params.repliesid);
      
      if (!reply)
        return res.status(400).send(`The reply with id "${req.params.repliesid}" 
        does not exist.`);
  
      return res.send(reply);
  
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });


  
  module.exports = router;