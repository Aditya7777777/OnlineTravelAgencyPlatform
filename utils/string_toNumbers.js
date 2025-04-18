// 1. Select the checked radio button
const selectedRatingInput = document.querySelector('input[name="review[rating]"]:checked');

// 2. Convert its value (which is a string) to a number
const ratingNumber = selectedRatingInput ? Number(selectedRatingInput.value) : null;

// 3. Now ratingNumber is a number
console.log(ratingNumber); // Example: 3 (number), not "3" (string)
console.log(typeof ratingNumber); // Outputs: "number"
