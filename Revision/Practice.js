const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("enter the digit to be reversed: ", (num) => {
  const revStr = num.toString();

  const arr = revStr.split("");
  console.log(`array: [${arr}]`);

  let revArr = [];
  for(let i=arr.length-1; i>=0; i--){
    revArr.push(arr[i]);
  }

  const revDigit = revArr.join("");
  console.log(`reversed: ${revDigit}]`);

})