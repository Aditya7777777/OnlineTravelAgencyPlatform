const Listing = require('../models/listing');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');//in the map box sdk there are various services and we are requiring geocoding.
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken}); //starting the service by passing  access Token adn a client with which we can apply geocoding.


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});    
    res.render("listings/index.ejs", {
        allListings
    });

}

module.exports.renderNewRoute = (req, res) => {
    res.render("listings/new.ejs");

}

module.exports.showListing = async (req, res) => {
    let {
        id
    } = req.params;
    const listing = await Listing.findById(id).populate({path: 'reviews', populate:{path : 'author'}, }).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does'nt exists");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {
        listing
    });
}

module.exports.createListing = async (req, res, next) => {
        // let{title,description,image,price,country,location} = req.body;
        let response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
          }).send()

          
            
        let url =  req.file.path;
        let filename = req.file.filename;
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {url,filename};

        newListing.geometry = response.body.features[0].geometry;

        let savedListing = await newListing.save();
        console.log(savedListing);
        req.flash("success","New Listing Created!");
        res.redirect("/listings");

}

module.exports.renderEditForm = async (req, res) => {
    let {
        id
    } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does'nt exists");
        res.redirect("/listings");
    }
    
    //we can directly make changes to the url and cloudinary provides that features and it's  implementation is given  below
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", {
        listing , originalImageUrl
    });
}

module.exports.updateListing = async (req, res) => {
   let {id} = req.params;
   // Update the listing with text-based form fields (e.g., title, price, description)
    let listing = await Listing.findByIdAndUpdate(id, {
        ...req.body.listing
    });
    // If a new image was uploaded, update the image details as well
// Cloudinary returns the file's URL in `req.file.path` and its filename in `req.file.filename`
   if(typeof req.file !== "undefined"){
    let url =  req.file.path;
   let filename = req.file.filename;
   listing.image = {url,filename};
   await listing.save();
   }
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let {
        id
    } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
}