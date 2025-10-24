// Most frequent element (tie -> smallest element)
class Solution {
  mostFrequentElement(nums) {
    let maxFreq = 0;
    let maxEle = 0;

    // Count frequencies
    const mpp = new Map();
    for (let i = 0; i < nums.length; i++) {
      const key = nums[i];
      if (mpp.has(key)) {
        mpp.set(key, mpp.get(key) + 1);
      } else {
        mpp.set(key, 1);
      }
    }

    // Pick most frequent; tie -> smaller element (traditional for over keys)
    const keys = Array.from(mpp.keys());
    for (let i = 0; i < keys.length; i++) {
      const ele = keys[i];
      const freq = mpp.get(ele);
      if (freq > maxFreq) {
        maxFreq = freq;
        maxEle = ele;
      } else if (freq === maxFreq) {
        if (ele < maxEle) 
          maxEle = ele;
      }
    }

    return maxEle;
  }
}

// --- Simple input (Node.js): space-separated integers ---
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Enter array elements (space-separated): ", (line) => {
  const nums = line.trim().split(/\s+/).map(Number);
  const sol = new Solution();
  const ans = sol.mostFrequentElement(nums);
  console.log("Most frequent element:", ans);
  rl.close();
});
