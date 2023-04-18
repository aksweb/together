const express = require('express');
const router = express.Router();
const Todo = require('../models/mySchema'); // Import the Todo model

// GET all todos
router.post('/user', async (req, res) => {
    console.log(req.body);
    try {
        const userName = req.body.userName;
        const user = await Todo.findOne({ userName: userName });
        if (!user) {
            console.log("user not found");
        }
        const resp = user.data.post;
        console.log(resp);
        // else {
        //     // console.log(todos.text);
        //     res.status(200).json(todos);
        // }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;