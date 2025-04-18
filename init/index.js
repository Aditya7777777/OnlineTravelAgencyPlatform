const mongoose = require("mongoose");
// here "./data.js" referes to the file which is present in the same directory in such case we use ./
const initData = require("./data.js");
// here "../models/listings.js" refers to the parent directory in such cases we use ../
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() =>{
    console.log("Connected to DB");
})
.catch((err) =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async() =>{
    await Listing.deleteMany({});
    // The above line of code is used to delete whatever data is  present inside 
    // in the collection and then add it to the database;
    initData.data = initData.data.map((obj) =>({...obj,owner:"67a47f0c8a6de0aa02f1c6a9"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();