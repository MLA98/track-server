require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../src/routes/authRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');
const trackRouters = require('../src/routes/trackRoutes');


const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRouters);
const mongoUri = 'mongodb://yuldong:12qwaszx@cluster0-shard-00-00-nfl2q.mongodb.net:27017,cluster0-shard-00-01-nfl2q.mongodb.net:27017,cluster0-shard-00-02-nfl2q.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
   useNewUrlParser: true,
   useCreateIndex: true 
});

mongoose.connection.on('connected', () => {
    console.log('connected');
})

mongoose.connection.on('error', () => {
    console.error('?? not connected');
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening to port 3000');
});