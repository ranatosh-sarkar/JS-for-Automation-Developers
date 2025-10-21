//largest digit in a number

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("enter the number: ", (num) => {
    let temp = 0;
    const chars = num.split("");
    let arr = [];
    for(let i=0; i<chars.length; i++){
        arr.push(parseInt(chars[i]));
    } 

    for(let i=0; i<=arr.length-2; i++){
        if(arr[i] > arr[i+1]){
            temp = arr[i];
            arr[i] = arr[i+1];
            arr[i+1] = temp;
        }
    }
    console.log(`largest digit is: ${arr[arr.length-1]}`);
    rl.close();
});