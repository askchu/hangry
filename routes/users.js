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

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.route('/favorites')
    .get(users.favoritePage)
    .post(users.generateFavorite)
    .put(users.deleteFavorite)

router.route('/editFavorites')
    .get(users.editFavorite)

router.get('/logout', users.logout);



module.exports = router;
