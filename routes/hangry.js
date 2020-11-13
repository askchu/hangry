const express = require('express');
const router = express.Router();
const Hangry = require('../models/hangry')
const catchAsync = require('../utils/catchAsync')
const hangry = require('../controllers/hangry');

router.route('/')
    .get(catchAsync(hangry.index))
    .post(catchAsync(hangry.search))

router.route('/results')
    .get(catchAsync(hangry.results))

module.exports = router;