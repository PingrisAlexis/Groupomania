//Import Express: Use express router.
const express = require('express');
//Import authentification .
const auth = require('../middleware/auth');
//Call of the express router with the method.
const router = express.Router();

//Import comments controllers. Functions are associated with the different routes.
const commentCtrl = require('../controllers/comment');

//Route to create a comment.
router.post('/', auth, commentCtrl.createOneComment);
//Route to modify a comment.
router.put('/:id', auth, commentCtrl.modifyOneComment);
//Route to delete a comment.
router.delete('/:id', auth, commentCtrl.deleteOneComment);
//Route to get all commments.
router.get('/', auth, commentCtrl.getAllComments);

module.exports = router;