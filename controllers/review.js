const Listing = require("../models/listing.js");
const Review = require("../models/review.js");



module.exports.createReview = async (req, res) => {
    console.log(res.body);
    let listing = await Listing.findById(req.params.id);
    req.body.review.rating = Number(req.body.review.rating);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    
    await newReview.save();
    await listing.save();
    req.flash("success"," New Review created");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview = async (req, res) => {
    let {
        id,
        reviewId
    } = req.params;
    await Listing.findByIdAndUpdate(id, {
        $pull: {
            reviews: reviewId
        }
    }); // here we are using pull operator
    await Review.findByIdAndDelete(reviewId); //$pull operator removes from an existing array all instances of a value or values that match aspecific condition
    //In the listing Schema there is an array of reviews as the review gets deleted the object_id that is stored stored inside the 
    //listing object should also get deleted so inorder to achieve this we use the above statement
    req.flash("success","review Deleted");
    res.redirect(`/listings/${id}`);
}