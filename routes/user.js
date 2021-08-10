//Import Express: Use express router.
const express = require('express');
//Import authentification .
const auth = require('../middleware/auth');
//Import Multer to manage images.
const multer = require("../middleware/multer-config");
//Call of the express router with the method.
const router = express.Router();

//Import users controllers. Functions are associated with the different routes.
const userCtrl = require('../controllers/user');
//Import password rules. Functions are associated with the different routes.
const passwordValidation = require('../middleware/password');

//Route to create user.
router.post('/signup', passwordValidation, userCtrl.signupOneUser);
//Route to login user.
router.post('/login', userCtrl.loginOneUser);
//Route to delete a user.
router.delete('/:id',auth, userCtrl.deleteOneUser);
//Route to search a user.
router.get('/:id', auth, userCtrl.searchOneUser);
//Route to modify a user
router.put('/:id', auth, multer, userCtrl.modifyOneUser);

module.exports = router;