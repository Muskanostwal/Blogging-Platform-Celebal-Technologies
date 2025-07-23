const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");


//POST REVIEWS ROUTE
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(async(req,res) =>{
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        req.flash("success","New Review Created successfully");
        res.redirect(`/listings/${listing._id}`);
    }    
));

//DELETE REVIEW ROUTE
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor, 
    wrapAsync(async (req, res) => {
        let { id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        req.flash("success","Review Deleted Successfully");
        res.redirect(`/listings/${id}`);
    })
);


module.exports = router;