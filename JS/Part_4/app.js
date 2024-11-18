// assignment Q1

// let arr = [1, 2, 3, 4, 5, 6, 2, 3]; 
// let num = 2;
// let newArr = [];
// for(i=0; i<arr.length; i++) {
//     if(arr[i] === 2) {
//         arr.pop(); 
//     }
// }
// console.log(arr);

// Assignment Q2

// let count = 0;
// let number = 267934;
// for(let i = number; i > 0; i=Math.floor(i/10)) {
//     count++;
// }

// console.log(count);

//assingment Q3


// let number = 287152;
// let sum = 0;
// let copy = number;
// while(copy>0){
//     digit = copy % 10;
//     sum += digit;
//     copy = Math.floor(copy/10);
// }
// console.log(sum);


// let n = prompt("Enter the number:");

// let factorial = 1;

// for(let i=1; i<=n; i++) {
    
//     factorial *= i;
// }

// console.log(factorial);


let arr = [2, 5, 10, 4, 2, 7, 1, 9];
let largest = 0;

for(let i=0; i <= arr.length; i++) {
    if(largest < arr[i]) {
        largest = arr[i];
    }
}

console.log(largest);