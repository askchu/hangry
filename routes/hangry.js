const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const hangry = require('../controllers/hangry');

router.route('/')
    .get(catchAsync(hangry.index))
    .post(catchAsync(hangry.search))

router.route('/:id')
    .get(catchAsync(hangry.showLocation))
    .post(catchAsync(hangry.cuisineSearch))

router.route("/:id/search")
    .get(catchAsync(hangry.searchResults))
    .post(catchAsync(hangry.moreDetailsButton))

router.route("/:id/search/:res_id/details")
    .get(catchAsync(hangry.restaurantDetails))
    // Add a post route for saving favorite restaurant in users...

module.exports = router;