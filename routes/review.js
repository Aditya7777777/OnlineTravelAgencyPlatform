const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewControllers = require("../controllers/review.js");



// Reviews
// POST route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewControllers.createReview));


// Delete Review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewControllers.destroyReview));

module.exports = router;
   

// const router = express.Router({mergeParams:true});
/* Here merge params is used because whenever an s api 
 is called some parameters are passed into the url 
 but those parameters are stays in the app.js file only 
 review.js cannot access those parameters so in order to
 access those parameters we set mergeparams:true
*/
