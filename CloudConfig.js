//Whatever the important information are there of cloudinary we want to store them 
/*Which means that we will tell our code that if it wants to access the cloudinary 
account then how it can access.
*/
//utils/cloudinary.js
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");

//This set up the credentials so your app can access your Cloudinary account
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowedFormats: ["png","jpg","jpeg"], 
    },
  });


module.exports = {
    cloudinary,
    storage
}
