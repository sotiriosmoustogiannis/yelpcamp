const express = require('express')
//mergeParams:true is because we want to pass on req.params from url the id of campground (url on index.js line 45) 
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground.js')
const Review = require('../models/review.js')
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews.js')


// REVIEWS ENDPOINTS

// POST - Create a Review for a campground
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router
