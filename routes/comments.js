const express = require("express");
const router = express.Router();



router.get('/', async (req, res) => {
    try {
      const videos = await Video.find();
      return res.send(videos);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`); 
  
    }
  });
  
  
  
  
  router.get("/:videosid", async (req, res) => {
    try {
      const video = await Video.findById(req.params.videosid);
  
      if (!video)
        return res.status(400).send(`The video with id "${req.params.videosid}" 
        does not exist.`);
  
      return res.send(video);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  
  
  
  
  router.post("/", async (req, res) => {
    try {
      const { error } = validateVideo(req.body);
      if (error) return res.status(400).send(error);
  
      const video = new Video({
        comments: req.body.comments,
        replies: req.body.replies,
      });
  
      await video.save();
  
      return res.send(video);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  router.put("/:videosid", async (req, res) => {
    try {
      const { error } = validateVideo(req.body);
      if (error) return res.status(400).send(error);
  
      const video = await Video.findByIdAndUpdate(
        req.params.videosid,
        {
            comments: req.body.comments,
            replies: req.body.replies,
        },
        { new: true }
      );
      if (!video)
        return res.status(400).send(`The video with id "${req.params.id}" 
        does not exist.`);
  
      await video.save();
  
      return res.send(video);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  
  
  
  router.delete("/:videosid", async (req, res) => {
    try {
  
      const video = await Video.findByIdAndRemove(req.params.videosid);
      
      if (!video)
        return res.status(400).send(`The video with id "${req.params.videosid}" 
        does not exist.`);
  
      return res.send(video);
  
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });


  
  module.exports = router;