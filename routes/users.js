const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

// CONTROLLER
const users = require('../controllers/users');

// ROUTES
router.route('/register')
    .get(users.register)
    .post(catchAsync(users.registerPost))


module.exports = router;
