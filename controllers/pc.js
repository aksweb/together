const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const saltRounds = 15
const mySchema = require('../models/mySchema');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './imgs')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, file.originalname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

// Define a route for registering a new user
router.post('/new', upload.single('image'), async (req, res) => {
    console.log("posting");
    try {
        const userName = req.body.userName;
        const title = req.body.title;
        const des = req.body.des;
        console.log("req: ", req);
        console.log("re.field: ", req.file.fieldname);
        // const image_url = (req.file) ? req.file.filename : null
        const image_url = req.body.image_url

        mySchema.findOne({ userName: userName })
            .then(todo => {
                if (!todo) {
                    console.error('Document not found');
                    return res.status(404).json({ message: 'User not found' });
                }

                // Update the data.post field with new data
                const newPost = {
                    title: title,
                    des: des,
                    img_url: image_url,
                    noOfLikes: 0 // Set the default value of noOfLikes to 0
                };

                todo.data.post.push(newPost); // Append the newPost object to the data.post array
                return todo.save();
            })
            .then(updatedTodo => {
                console.log('Document updated successfully:', updatedTodo);
                return res.status(200).json({ message: 'Document updated successfully' });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({ message: 'Error updating document' });
            });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error registering user' });
    }
});

module.exports = router;
