const router = require("express").Router();
const Destination = require("../models/destination");

const express=require("express");



const multer = require('multer');
router.use('/uploads', express.static('uploads'));





const storage = multer.diskStorage({
  destination: function (request, file, callback) {
      callback(null, './uploads');
  },

  filename: function (request, file, callback) {
      callback(null, Date.now() + file.originalname);
  },
})

//uploads parameter for multer
const upload = multer({
  storage: storage,
  limits: {
      fieldSize: 1024 * 1024 * 3,
  },
  // fileFilter:fileFilter
})







//Create posts
router.post("/destination",upload.array('photo'), async (req, res) => {
    //  const photo = req.file ? req.file.path : null;
    const newPost = new Destination({
      title: req.body.title,
      city: req.body.city,
      description:req.body.description,

    });
    try {
      
      if (req.file) {
        newPost.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    }
    const data = await newPost.save();
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  });
  module.exports = router;
