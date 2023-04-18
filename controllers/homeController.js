const express = require('express');
const router = express.Router();
const Todo = require('../models/mySchema'); // Import the Todo model

// GET all todos
router.post('/todos', async (req, res) => {
    console.log(req.body);
    try {
        const userName = req.body.userName;
        const todos = await Todo.findOne({ userName: userName });
        if (!todos) {
            console.log("user not found");
        }
        else {
            // console.log(todos.text);
            res.status(200).json(todos);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE new todo
router.post('/todo/new', async (req, res) => {

    try {
        const { userName, text } = req.body;

        // Find the user by their username
        const todo = await Todo.findOne({ userName: req.body.userName });

        if (!todo) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the new task to the user's text array
        todo.text.push(req.body.text);

        // Save the updated todo document
        await todo.save();

        // Return the updated todo object
        res.status(200).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
    console.log(req.body);

});


router.post('/delete', async (req, res) => {
    const userName = req.body.userName;
    const taskId = req.body.task_id;

    try {
        const result = await Todo.findOneAndUpdate(
            { userName: userName },
            { $pull: { text: taskId } },
            { new: true } // return the updated document
        );
        if (!result) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully', todo: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;