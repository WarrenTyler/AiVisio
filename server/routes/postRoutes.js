import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config({ path: "../.env" });

const router = express.Router();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").get(async (req, res) => {
  // Get all the posts from the database.
  try {
    const posts = await Post.find({});

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});

router.route("/").post(async (req, res) => {
  alert(process.env.CLOUDINARY_CLOUD_NAME);
  // Create a post that stores the url of the photo in the database,
  // after first uploading the photo to cloudinary.
  // This avoids storing the actual photo in the database to save space.
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    // Store the new post in the database.
    const newPost = new Post({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
});

// router.route('/').get(async (req, res) => {
//   try {
//     const posts = await Post.find({});
//     res.status(200).json({ success: true, data: posts, message: process.env.CLOUDINARY_API_KEY });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
//   }
// });

// router.route('/').post(async (req, res) => {
//   try {
//     const { name, prompt, photo } = req.body;
//     const photoUrl = await cloudinary.uploader.upload(photo);

//     const newPost = await Post.create({
//       name,
//       prompt,
//       photo: photoUrl.url,
//     });

//     res.status(200).json({ success: true, data: newPost });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
//   }
// });

export default router;
