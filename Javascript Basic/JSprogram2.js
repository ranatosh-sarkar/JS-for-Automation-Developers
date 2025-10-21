// Program 2 - Auto, Auto after enter & Custom Sum of Multiples of 3 and 5

// Problem Statement:Write a JavaScript program that performs two tasks:

// Automatically calculates and prints the sum of all numbers from 1 to 1000 that are multiples of 3 or 5.

// Then, it asks the user to enter another limit number (N) and calculates the sum of all numbers from 1 to N that are multiples of 3 or 5.

// Sample Output
// Sum of multiples of 3 and 5 up to 1000 is: 234168
// Enter your own limit number: 50
// Sum of multiples of 3 and 5 up to 50 is: 593

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let autoSum = 0;
for(let i=1; i<=1000; i++){
  if(i%3 == 0 || i%5 == 0){
    autoSum += i;
  }
}
console.log(`Auto Summation of multiples of 3 and 5 upto 1000 is: ${autoSum}`);
autoSum = 0;

rl.question("Hit Enter to find the sum: ", () => {
  for(let i=1; i<=1000; i++){
    if(i%3 == 0 || i%5 == 0){
    autoSum += i;
    }
  }
  console.log(`Summation of multiples of 3 and 5 upto 1000 is: ${autoSum}`);
  autoSum=0;

rl.question("Enter limit to find the sum: ", (num) => {
  let n = parseInt(num);
  for(let i=1; i<=n; i++){
    if(i%3 == 0 || i%5 == 0){
    autoSum += i;
    }
  }
  console.log(`Summation of multiples of 3 and 5 upto ${n} is: ${autoSum}`);  
  rl.close();
});
});