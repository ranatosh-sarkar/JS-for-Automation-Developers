// Program 1 - Objective - In this challenge, we're going to use loops to help us do some simple math.

// Task - Given an integer, N , print its first 10 multiples. Each multiple N X i (where 1<=i<=10) should be printed on a 
// new line in the form: N x i = result.

// Input Format: A single integer, N .
// Constraints Output Format: 2<=N<=20

// Output format: 
// Print 10 lines of output; each line i (where 1<=i<=10) contains the result of N X i in the form:
// N x i = result.

// Sample Input: 2
// Sample Output 
// 2 x 1 = 2
// 2 x 2 = 4
// 2 x 3 = 6
// 2 x 4 = 8
// 2 x 5 = 10
// 2 x 6 = 12
// 2 x 7 = 14
// 2 x 8 = 16
// 2 x 9 = 18
// 2 x 10 = 20

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});

rl.question("enter number:", (num) => {
    const n = parseInt(num);
    for(let i = 1; i<=10; i++){
        console.log(`${n} x ${i} = ${n*i}`);
    }
    rl.close();
});
