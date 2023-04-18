const express = require('express');
const router = express.Router();
const Todo = require('../models/mySchema'); // Import the Todo model

// GET all todos
router.post('/profile', async (req, res) => {
    console.log(req.body);
    try {
        const userName = req.body.userName;
        const user = await Todo.findOne({ userName: userName });
        if (!user) {
            console.log("user not found");
        }
        const resp = user.data.post;
        // console.log(resp);
        res.status(200).json(resp); // Return the 'post' array to the front end

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
