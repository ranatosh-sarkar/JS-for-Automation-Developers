//sum of array elements

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter digits separated by spaces: ", (input) => {
  // Step 1: Split input into array of strings
  const parts = input.split(" ");

  // Step 2: Convert each part to an integer
  const arr = parts.map(Number);

  // Step 3: Initialize sum variable
  let sum = 0;

  // Step 4: Loop through array and add each element
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  // for(let i=0; i<=chars.length-1; i++){
  //   arr.push(chars[i]);
  // }

  // for(let i=0; i<=arr.length-1; i++){
  //   sum += parseInt(arr[i]);
  // }

  // Step 5: Print result
  console.log(`Sum of array elements: ${sum}`);

  rl.close();
});
