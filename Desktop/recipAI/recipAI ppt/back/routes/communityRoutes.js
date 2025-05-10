const express = require('express');
const multer = require('multer');
const { createPost, getPosts } = require('../controllers/communityController');
const auth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', auth, upload.single('image'), createPost);
router.get('/', getPosts);

module.exports = router;
