const redis = require('redis');
const client =  redis.createClient();

module.exports = (req, res, next) => {
    client.del(JSON.stringify(req.user.id));
    next();
};