const jwt = require('jsonwebtoken');
const mongoose =  require('mongoose'); 
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).send({error: 'You must sign in'});
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'My secret key', async (err, payload) => {
        if(err){
            return res.status(401).send({error: 'You must sign in'});
        }

        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    });
};