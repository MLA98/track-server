const express = require('express');
const mongoose =  require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        console.log(name, locations.length);
        return res.status(422).send({error: 'must provide pwd and email'});
    }
    
    try{
        const user = new User({email, password});
        await user.save();
        const token = jwt.sign({userId: user._id}, 'My secret key');
        res.send({token});
    }    
    catch(e){
        return res.status(422).send(e);
    }
}); 

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(422).send({error: 'must provide pwd and email'});
    }

    const user = await User.findOne({ email });
    if (!user){
        return res.status(422).send({error: 'Email not found'});
    }

    try{
        await user.comparePassword(password);
        const token = jwt.sign({userId: user._id}, 'My secret key');
        res.send({token});
    }
    catch(e){
        return res.status(422).send({error: 'Invalid pwd or email'}); 
    }
});

module.exports = router;