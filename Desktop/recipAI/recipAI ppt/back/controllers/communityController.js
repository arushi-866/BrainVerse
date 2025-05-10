const CommunityPost = require('../models/communityPostModel');
const cloudinary = require('../config/cloudinary');

exports.createPost = async (req, res) => {
  try {
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newPost = await CommunityPost.create({
      ...req.body,
      image: imageUrl,
      user: {
        _id: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar,
        verified: req.user.verified
      }
    });

    res.status(201).json({
      status: 'success',
      data: newPost
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      status: 'success',
      data: posts
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
