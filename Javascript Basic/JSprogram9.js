// Second most frequent element (tie -> smallest element among second-highest)
class Solution {
  secondMostFrequentElement(nums) {
    // Count frequencies (hashing with Map)
    const mpp = new Map();
    for (let i = 0; i < nums.length; i++) {
      const key = nums[i];
      if (mpp.has(key)) {
        mpp.set(key, mpp.get(key) + 1);
      } else {
        mpp.set(key, 1);
      }
    }

    // If fewer than 2 distinct elements, no "second most" exists
    const keys = Array.from(mpp.keys());
    if (keys.length < 2) return undefined;

    // 1) Find the highest frequency
    let maxFreq = 0;
    for (let i = 0; i < keys.length; i++) {
      const ele = keys[i];
      const freq = mpp.get(ele);
      if (freq > maxFreq) {
        maxFreq = freq;
      }
    }

    // 2) Find the second-highest frequency (strictly less than maxFreq)
    let secondMaxFreq = 0;
    for (let i = 0; i < keys.length; i++) {
      const ele = keys[i];
      const freq = mpp.get(ele);
      if (freq < maxFreq && freq > secondMaxFreq) {
        secondMaxFreq = freq;
      }
    }

    // If no frequency strictly less than maxFreq was found
    if (secondMaxFreq === 0) return undefined;

    // 3) Among elements with secondMaxFreq, pick the smallest element
    let secondMaxEle = undefined;
    for (let i = 0; i < keys.length; i++) {
      const ele = keys[i];
      const freq = mpp.get(ele);
      if (freq === secondMaxFreq) {
        if (secondMaxEle === undefined || ele < secondMaxEle) {
          secondMaxEle = ele;
        }
      }
    }

    return secondMaxEle;
  }
}

// --- Simple input (Node.js): space-separated integers ---
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Enter array elements (space-separated): ", (line) => {
  const nums = line.trim().split(/\s+/).map(Number);
  const sol = new Solution();
  const ans = sol.secondMostFrequentElement(nums);

  if (ans === undefined) {
    console.log("No second most frequent element (not enough distinct frequencies).");
  } else {
    console.log("Second most frequent element:", ans);
  }

  rl.close();
});
