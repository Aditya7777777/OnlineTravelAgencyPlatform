//Imagine we have an existing listing object 
const listing = {
    title:"Cozy Apartment",
    price: 1000,
    location: "New York"
};

//Now we get new updated data (e.g.,from a form submission)

const updatedData = {
    price:1200,
    location:"Los Angeles"
};

//Without Spread operator (Incorrect Nesting)
const update1 = {
    updatedData
};

console.log(update1);