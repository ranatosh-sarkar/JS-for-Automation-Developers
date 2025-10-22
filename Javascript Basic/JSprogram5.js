//prime number

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a number to find out whether it's prime or not: ", (num) => {
    let n = parseInt(num);
    let count = 0;
    for(let i=1; i<=n; i++){
        if(num%i==0){
            count++;
        }
    }
    if(count==2){
        console.log(`Its a Prime Number`);
    }else{
        console.log(`Its not a Prime Number`);
    }

    rl.close();
});