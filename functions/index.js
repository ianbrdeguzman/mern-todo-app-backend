const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoute = require('./routes/todoRoute.js');

// initialize env variables
require("dotenv").config();

// connect to mongoose
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
).then(()=> console.log('MongoDB connected.'))
.catch((error) => console.log(error));

// initialize express app
const app = express();

// use cors
app.use(cors());
// use json
app.use(express.json());

// todo route
app.use('/api', todoRoute);

// catch errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    })
})

exports.app = functions.https.onRequest(app);