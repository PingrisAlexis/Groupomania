//Import Express: Use express router.
const express = require('express');
//Import authentification .
const auth = require('../middleware/auth');
//Import Multer to manage images.
const multer = require("../middleware/multer-config");
//Call of the express router with the method.
const router = express.Router();

//Import posts controllers. Functions are associated with the different routes.
const postCtrl = require('../controllers/post');
//Import comments controllers. Functions are associated with the different routes.
const commentCtrl = require('../controllers/comment');

//Posts
//Route to create a post.
router.post('/', auth, multer, postCtrl.createOnePost);
// //Route to modify a post.
// router.put('/:id', auth, multer, postCtrl.modifyOnePost);
// //Route to delete a post.
// router.delete('/:id', auth, multer, postCtrl.deleteOnePost);
// //Route to get one post.
router.get('/:id', auth, postCtrl.getOnePost);
// //Route to get all posts.
router.get('/', auth, postCtrl.getAllPosts);

//Comments
//Route to create a comment.
router.post('/:id/comments', auth, commentCtrl.createOneComment);
//Route to modify a comment.
// router.put('/:id/comments/:id', auth, commentCtrl.modifyOneComment);
//Route to delete a comment.
// router.delete('/:id/comments/:id', auth, commentCtrl.deleteOneComment);
//Route to get all commments.
router.get('/:id/comments', auth, commentCtrl.getAllComments);
module.exports = router;