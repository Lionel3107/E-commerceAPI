const express = require('express');
const User = require("../models/user");
const router = express.Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register a new User

router.post("/register", async (req, res) => {
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
    });


    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json(error)
    }
});
// Login
router.post('/login', async (req, res) => {
   try {
    const user = await User.findOne({username: req.body.username});
    if(!user)
        {
        res.status(401).json("Wrong credentials")
    }

    const hashedPassword = CryptoJS.AES.decrypt(
        user.password, 
        process.env.SECRET
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password){
        res.status(401).json("Wrong credentials");
    }

    const accessToken = jwt.sign({id : user._id}, process.env.SECRET,{
        expiresIn :"3d",
    });



    const {password, ...other} = user._doc;
    res.status(200).json({...other, accessToken});


   } catch (error) {

    res.status(500).json(error);

   }

});

module.exports = router;