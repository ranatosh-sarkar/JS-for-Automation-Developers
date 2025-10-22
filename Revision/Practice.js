const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("enter number : ", (num) => {
  const chars = num.split("");
  const arr = [];
  let temp=0;
  for(let i=0; i<=chars.length-1; i++){
    arr.push(parseInt(chars[i]));
  }
  for(let i=0; i<=arr.length-2; i++){
  if(arr[i] > arr[i+1]){
    temp=arr[i];
    arr[i] = arr[i+1];
    arr[i+1] = temp;
  }
  }
  console.log(`largest digit: ${arr[arr.length-1]}`);
  rl.close();
});