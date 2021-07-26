//Import Express: Use express router.
const express = require('express');
//Import authentification .
const auth = require('../middleware/auth');
//Call of the express router with the method.
const router = express.Router();

//Import users controllers. Functions are associated with the different routes.
const userCtrl = require('../controllers/user');
//Import password rules. Functions are associated with the different routes.
const passwordValidation = require('../middleware/password');

//Route to create user.
router.post('/signup', passwordValidation, userCtrl.signup);
//Route to login user.
router.post('/login', userCtrl.login);
//Route to delete a user.
router.delete('/:id',auth, userCtrl.delete);
//Route to search a user.
router.get('/:id', userCtrl.search);

module.exports = router;