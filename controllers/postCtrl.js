const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const saltRounds = 15
const mySchema = require('../models/mySchema');
const multer = require('multer');
const { Long } = require('mongodb');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dwhcgeanj",
    api_key: "559212626126411",
    api_secret: "m9-MWDuehvqa25G6HhcHxyo17Wo"
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './imgs')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        // cb(null, uniqueSuffix)
        cb(null, uniqueSuffix + '_' + file.originalname)
    }
})


const upload = multer({ storage: storage })

// Define a route for registering a new user
router.post('/new', upload.single('image'), async (req, res) => {
    console.log("posting");
    try {
        console.log(req.file);
        console.log(req.file.path);
        // const image_url = req.file.path

        const path = req.file.path
        const imgName = req.file.name
        const res = cloudinary.uploader.upload(path, { public_id: imgName })
        // var img_url = "www"
        res.then((data) => {
            // console.log(data);
            // img_url = data.secure_url
            // const path = req.file.path
            const imgUrl = data.secure_url
            const uname = req.body.userName
            const title = req.body.title
            const des = req.body.des
            console.log(imgUrl, " ", uname, " ", title, " ", des);

            mySchema.findOne({ userName: uname })
                .then(todo => {
                    if (!todo) {
                        console.error('Document not found');
                        return res.status(404).json({ message: 'User not found' });
                    }

                    // Update the data.post field with new data
                    const newPost = {
                        userName: uname,
                        title: title,
                        des: des,
                        img_url: imgUrl,
                        noOfLikes: 0 // Set the default value of noOfLikes to 0
                    };

                    todo.data.post.push(newPost); // Append the newPost object to the data.post array
                    return todo.save();
                })
                .then(updatedTodo => {
                    console.log('Posted Successfully:', updatedTodo);
                    return res.status(200).json({ message: 'Document updated successfully' });
                })
                .catch(err => {
                    console.error(err);
                    // return err.status(500).json({ message: 'Error updating document' });
                });





            // ------------------


        }).catch((err) => {
            console.log(err);
        });

        const url = cloudinary.url(imgName, {
            width: 100,
            height: 150,
            Crop: 'fill'
        });
        console.log(img_url);
        // console.log(img_url);
        // console.log(img_url);
        // console.log(img_url);
        // console.log(img_url);




    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error registering user' });
    }
});

module.exports = router;
