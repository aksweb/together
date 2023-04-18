const mongoose = require('mongoose');

const LoginSch = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Login = mongoose.model('toDo_full', LoginSch);

module.exports = Login;
