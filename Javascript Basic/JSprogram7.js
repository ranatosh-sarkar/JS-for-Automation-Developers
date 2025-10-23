// Given an array of integers, find the most frequent element in it i.e., the element that 
// occurs the maximum number of times. If there are multiple elements that appear a 
// maximum number of times, find the smallest of them.

// Approach:
// Initialize a visited array of boolean type having size n, where n is the size of the array with all elements set to false. Also, declare the following variables :
// maxFreq - to store the frequency of the highest occurring element.
// maxEle - to store the highest occurring element in the array.
// In the first loop, start iterating on the elements of the array selecting one element at a time.
// In the second loop, iterate on the rest portion of the array and count the frequency (number of occurrences) of the selected element. And every time, the same element is found, mark the corresponding index in the visited array as true.
// If the frequency of the current element is found greater than maxFreq, update maxFreq and maxEle with the new frequency and new element respectively.
// If the frequency of the current element is the same as maxFreq, store the smaller of maxEle and the current element in maxEle.
// Before starting the second loop, check if the element is marked as unvisited. Skip the element if it is visited because its frequency has already been taken into consideration.


const readline = require("readline");

class Solution {
  /* Function to get the highest occurring element in array nums */
  mostFrequentElement(nums) {
    const n = nums.length;

    let maxFreq = 0;      // maximum frequency seen so far
    let maxEle = 0;       // element with that maximum frequency
    const visited = new Array(n).fill(false); // mark indices already counted

    for (let i = 0; i < n; i++) {
      if (visited[i]) continue; // skip if this index already counted in a previous pass

      let freq = 0; // frequency of nums[i]

      for (let j = i; j < n; j++) {
        if (!visited[j] && nums[i] === nums[j]) {
          freq++;
          visited[j] = true; // mark this occurrence so we don't count it again
        }
      }

      // Update best so far
      if (freq > maxFreq) {
        maxFreq = freq;
        maxEle = nums[i];
      } else if (freq === maxFreq) {
        maxEle = Math.min(maxEle, nums[i]); // tie-break: pick smaller element
      }
    }

    return maxEle;
  }
}

// --- Read input from user: space-separated integers ---
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Enter array elements (space-separated): ", (line) => {
  // Parse input like: "4 4 5 5 6" -> [4, 4, 5, 5, 6]
  const nums = line.trim().split(/\s+/).map(Number);

  // (Optional minimal check) If any NaN, you can handle as needed; assuming valid integers per the prompt.
  const sol = new Solution();
  const ans = sol.mostFrequentElement(nums);

  console.log("The highest occurring element in the array is:", ans);
  rl.close();
});
