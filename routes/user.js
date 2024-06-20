const express = require('express');
const User = require('../models/user');
const {verifyTokenAndAuthorization} = require('../routes/verifyToken');
const router = express.Router();

// Update

router.put('/:id', verifyTokenAndAuthorization, async (req, res,) => {
    if (req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET
        ).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200);json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Delete a user

router.delete('/:id', verifyTokenAndAuthorization, async (req,res) =>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted');

    }
    catch(error){
        res.status(500).json(error);
    }
});

//Get a single user
router.delete('/find/:id', verifyTokenAndAuthorization, async (req,res) =>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json('user');

    }
    catch(error){
        res.status(500).json(error);
    }
});



module.exports = router;