const express = require('express');
const router = express.Router();


const User = require('../models/mySchema'); // Import the User model
// Assuming you have already established a connection to your MongoDB database using Mongoose

// Fetch the 'post' array of all users
router.get('/all', async (req, res) => {
    try {
        console.log("in try");
        const users = await User.find({}, 'data.post');
        const posts = users.map(user => user.data.post).flat();
        console.log("flattening");
        console.log(posts);
        return res.json(posts); // Return the flattened 'posts' array as JSON response
    } catch (error) {
        console.error(error);
        // Handle error appropriately
    }
});

module.exports = router;
