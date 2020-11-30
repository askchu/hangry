const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const hangry = require('../controllers/hangry');
const { isLoggedIn } = require('../middleware')


router.route('/')
    .get(catchAsync(hangry.index))
    .post(catchAsync(hangry.search))

router.route('/:id')
    .get(catchAsync(hangry.showLocation))
    .post(catchAsync(hangry.cuisineSearch))

router.route("/:id/search")
    .get(catchAsync(hangry.searchResults))
    .post(catchAsync(hangry.moreDetailsButton))

router.route("/:id/search/filter")
    .post(catchAsync(hangry.filterOptionResult))

router.route("/:id/search/filter/ratings")
    .get(catchAsync(hangry.filterByRatings))

router.route("/:id/search/filter/averageCost")
    .get(catchAsync(hangry.filterByAverageCost))

router.route("/:id/search/filter/ratings&cost")
    .get(catchAsync(hangry.filterByRatingsAndCost))

router.route("/:id/search/:res_id/details")
    .get(catchAsync(hangry.restaurantDetails))
    .post(isLoggedIn, catchAsync(hangry.saveFavorites))

module.exports = router;