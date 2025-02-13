// ==========================================
// Number and Array Manipulations (Part 4)
// ==========================================

// --- (Commented Out) Assignment Q1: Array Modification ---
// This block attempts to remove items equal to 2 from the array.
// Note: Using pop() in a loop is not a recommended approach.
/*
let arr = [1, 2, 3, 4, 5, 6, 2, 3]; 
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 2) {
    arr.pop();
  }
}
console.log(arr);
*/

// --- (Commented Out) Assignment Q2: Count Digits of a Number ---
// Count the number of digits in a given number.
/*
let count = 0;
let number = 267934;
for (let i = number; i > 0; i = Math.floor(i / 10)) {
  count++;
}
console.log("Digit count:", count);
*/

// --- (Commented Out) Assignment Q3: Sum of Digits and Factorial ---
// Calculate the sum of digits of a number.
/*
let numberForSum = 287152;
let sum = 0;
let copy = numberForSum;
while (copy > 0) {
  let digit = copy % 10;
  sum += digit;
  copy = Math.floor(copy / 10);
}
console.log("Sum of digits:", sum);
*/

// Calculate factorial of a number using a for loop.
// Uncomment to test in a browser environment:
/*
let n = prompt("Enter a number to calculate factorial:");
let factorial = 1;
for (let i = 1; i <= n; i++) {
  factorial *= i;
}
console.log("Factorial:", factorial);
*/

// --- Active Code: Find the Largest Element in an Array ---
let arr = [2, 5, 10, 4, 2, 7, 1, 9];
let largest = 0;

for (let i = 0; i < arr.length; i++) {
  if (largest < arr[i]) {
    largest = arr[i];
  }
}

console.log("Largest element in the array:", largest);
