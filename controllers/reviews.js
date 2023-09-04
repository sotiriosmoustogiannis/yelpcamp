const Campground = require('../models/campground')
const Review = require('../models/review')


module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    // in order to take from req.params the id of campground we have to use the mergeParams (line 3 on this file) 
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully created a new review')
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    // Firstly, we have to remove the reviews from campground model
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    // Then we remove all the review
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${id}`);
}