
const router = require("express").Router();
const User = require("../models/User");

const express=require("express");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
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

//Register
router.post("/register",upload.single('photo'), async (req, res) => {
  const photo = req.file ? req.file.path : null;
  const newUser = new User({
    username: req.body.username,
    name:req.body.name,
    profilePic:photo,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong password or username!");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password or username");

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "90d" }
    );

    const { password, ...info } = user._doc;
    res.status(200).json({...info,accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

