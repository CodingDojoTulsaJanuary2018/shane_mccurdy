var mathlib = require('./mathlib')();

console.log(mathlib.add(50,25));
console.log(mathlib.multiply(50,5));
console.log(mathlib.square(7));
var count = 30;
while (count){
  console.log("Random -- ", mathlib.random(10,15));
  count--;
}
