const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");


router
     .route("/")
    .get( wrapAsync(listingController.index)) //index route 
    // .post(isLoggedIn, validateListing,
    // wrapAsync(listingController.createListing));//create route
    .post((req,res)=>{
        res.send(req.body);
    })

// New Route
router.get("/new",isLoggedIn, listingController.renderNewRoute);

router
    .route("/:id")
    .get(listingController.showListing) //show route
    .put(isLoggedIn, isOwner , validateListing, wrapAsync(listingController.updateListing)) //update route
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)); //delete route
// CRUD C-Create having new and show route below we are creating new route




// End of Create route
// Start of update route
// CRUD U-creating Edit and update route

// Edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;
