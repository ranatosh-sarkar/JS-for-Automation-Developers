//reverse a given number using string and array

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter a number: ", (num) => {
  // Step 1: Convert number to string
  const strNum = num.toString();
  console.log(`String form: ${strNum}`);

  // Step 2: Put each character into an array
  const arr = strNum.split("");
  console.log(`Array form: [${arr}]`);

  // Step 3: Reverse array manually using a for loop
  let reversedArr = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversedArr.push(arr[i]);
  }
  console.log(`Reversed array: [${reversedArr}]`);

  // Step 4: Join elements to form the reversed string
  const reversedStr = reversedArr.join("");
  console.log(`Reversed string: ${reversedStr}`);

  rl.close();
});
