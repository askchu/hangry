const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

// CONTROLLER
const users = require('../controllers/users');

// ROUTES

router.route('/profile')
    .get(users.profile)
    .put(users.editResults)

router.route('/profile/edit')
    .get(users.editProfile)

router.route('/register')
    .get(users.register)
    .post(catchAsync(users.registerPost))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.route('/favorites')
    .get(users.favoritePage)
    .post(users.generateFavorite)
    .put(users.deleteFavoritePost)

router.route('/favorites/results')
    .get(users.results)

router.route('/deleteFavorites')
    .get(users.deleteFavorite)

router.get('/logout', users.logout);



module.exports = router;
