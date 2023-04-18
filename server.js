// app.js

const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path')

const bcrypt = require('bcrypt')
const saltRounds = process.env.SALTROUND

const app = express();

// Importing Controllers    
const homeController = require('./controllers/homeController');
const signupController = require('./controllers/signupController');
const postCtrl = require('./controllers/postCtrl')
const fetchPost = require('./controllers/fetchPost')
const commentCtrl = require('./controllers/commentCtrl')
const profileCtrl = require('./controllers/profileCtrl')
// const { default: SignUp } = require('../SignUp/Signup');

// Connecting to Mongo DB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
    .catch(console.error);

app.use(express.json());
app.use(cors());

// // Routes
app.use('/', homeController);
app.use('/user', signupController);
app.use('/user/post', postCtrl);
app.use("/allposts", fetchPost)
app.use("/user/comment", commentCtrl)
// app.use("/user/like", likeCtrl)
app.use("/user", profileCtrl)

//static files
app.use(express.static(path.join(__dirname, "./client/build")))
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})


app.listen(3001, () => (console.log("Server started")));