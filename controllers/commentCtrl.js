const express = require('express');
const router = express.Router();


const User = require('../models/mySchema'); // Import the User model
// Assuming you have already established a connection to your MongoDB database using Mongoose

// Fetch the 'post' array of all users
router.post('/new', async (req, res) => {
    try {
        console.log(req.body);
        console.log("in try");
        console.log("req.body: ", req.body);
        const userName = req.body.uName; // Get the userName from request body
        const user = await User.findOne({ userName }); // Find user by userName
        if (!user) {
            // Return appropriate response if user not found
            return res.status(404).json({ error: 'User not found' });
        }
        const postId = req.body.imgURL; // Get the postId from request body
        const post = user.data.post.find(p => p.img_url === postId); // Find post by postId in user's posts array
        if (!post) {
            // Return appropriate response if post not found
            return res.status(404).json({ error: 'Post not found' });
        }
        console.log("flattening");
        console.log(post);
        post.noOfLikes += 1
        await user.save();
        console.log(post.noOfLikes);
        return res.json(post);
    } catch (error) {
        console.error(error);
        // Handle error appropriately
    }
});


module.exports = router;
