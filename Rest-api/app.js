const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Middlewares 
app.use(bodyParser.json());
app.use(cors()); // using cors to access API from anywhere

// Import Routes
const postsRoute = require('./routes/posts');
// whenever you get /posts route, use imported postsRoute
app.use('/posts', postsRoute);

// Middlewares - functions that execute when routes are being hit 
    // app.use('/posts', () => {
    //     console.log('This is a middleware running');
    // })

// Routes 
app.get('/', (req, res) => {
    res.send('we are on home');
})

app.get('/posts', (req, res) => {
    res.send('we are on posts');
})

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => console.log('DB connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

// Listening to server
app.listen(3000);