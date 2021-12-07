const router = require("express").Router();
const Destination = require("../models/destination");

const express = require("express");

const multer = require('multer');
router.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, './uploads');
    },

    filename: function(request, file, callback) {
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
router.post("/destination", upload.array('photo'), async(req, res) => {

    let imageObjArr = [];
    for (let i = 0; i < req.body.images.length; i++) {
        // console.log(req.body.images[i])
        let imageString = req.body.images[i]
        let imageParts = imageString.split('--wesplithere--');
        imageObjArr.push({ url: imageParts[0], filename: imageParts[1] });
    }
    const newPost = new Destination({
        title: req.body.title,
        city: req.body.city,
        description: req.body.description,

    });
    try {

        newPost.images = imageObjArr.map(f => ({ url: f.url, filename: f.filename }));
        const data = await newPost.save();
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});
module.exports = router;