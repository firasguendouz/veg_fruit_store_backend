'''
Routes for user-related operations.
'''
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { validateUserRegistration, validateUserLogin } = require('../middleware/validation');
const router = express.Router();
router.post('/register', validateUserRegistration, registerUser);
router.post('/login', validateUserLogin, loginUser);
// Additional user-related routes...
module.exports = router;