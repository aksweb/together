const mongoose = require('mongoose');

const SignUpSch = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Signup = mongoose.model('toDo_full', SignUpSch);

module.exports = Signup;
