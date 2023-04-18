const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const saltRounds = 15
const mySchema = require('../models/mySchema');

// Define a route for registering a new user
router.post('/signup', async (req, res) => {
    try {
        const userName = req.body.userName;
        const email = req.body.email;
        const password = req.body.password;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new mySchema({
            userName: userName,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});


// Define a route for logging in an existing user
router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await mySchema.findOne({ userName });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log("Logging in..");
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in user' });
    }
});

module.exports = router;