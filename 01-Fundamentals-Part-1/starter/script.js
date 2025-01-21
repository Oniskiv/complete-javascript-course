let country = "Georgia";
let age = null;
let gender;

console.log(country);
console.log(age);
console.log(gender);

console.log(typeof country);
console.log(typeof age);
console.log(typeof gender);

age = 25;
console.log(age);
console.log(typeof age);

const massMark = 78;
const heightMark = 1.69;
const massJohn = 95;
const heightJohn = 1.95;

const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / (heightJohn * heightJohn);

console.log(`Mark ${BMIMark}`);
console.log(BMIJohn);