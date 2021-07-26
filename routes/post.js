//Import Express: Use express router.
const express = require('express');
//Import authentification .
const auth = require('../middleware/auth');
//Call of the express router with the method.
const router = express.Router();

//Import posts controllers. Functions are associated with the different routes.
const postCtrl = require('../controllers/post');

//Route to create a post.
router.post('/', auth, postCtrl.createOnePost);
//Route to modify a post.
router.put('/:id', auth, postCtrl.modifyOnePost);
//Route to delete a post.
router.delete('/:id', auth, postCtrl.deleteOnePost);
//Route to get one post.
router.get('/:id', auth, postCtrl.getOnePost);
//Route to get all post.
router.get('/', auth, postCtrl.getAllPost);

module.exports = router;