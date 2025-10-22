//reverse a given number using string and array

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter a number: ", (num) => {
  // Step 1: Put each character into an array
  const arr = num.split("");
  console.log(`Array form: [${arr}]`);

  // Step 2: Reverse array manually using a for loop
  let reversedArr = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversedArr.push(arr[i]);
  } 
  //"123" for reversedArr (push new element to the end of the array)
  //    [3]
  //  [3,2]
  //[3,2,1]
  console.log(`Reversed array: [${reversedArr}]`);

  // Step 3: Join elements to form the reversed string
  console.log(`reversed string: ${reversedArr.join("")}`);

  rl.close();
});
