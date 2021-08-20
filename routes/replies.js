// const express = require("express");
// const { Reply, validateReply } = require("../models/comment");
// const router = express.Router();


// // Generic Get All
// router.get('/', async (req, res) => {
//     try {
//       const replies = await Reply.find();
//       return res.send(replies);
//     } catch (ex) {
//         return res.status(500).send(`Internal Server Error: ${ex}`); 
  
//     }
//   });


//   // Posting Reply to Specific Comment
//   router.post("/:commentId", async (req, res) => {
//     try {
//       const { error } = validateReply(req.body);
//       if (error) return res.status(400).send(error);
  
//       const reply = new Reply({
//         commentText: req.body.commentText,
//         replyText: req.body.replyText,
//       });
  
//       await reply.save();
  
//       return res.send(reply);
//     } catch (ex) {
//       return res.status(500).send(`Internal Server Error: ${ex}`);
//     }
//   });
  
//   module.exports = router;