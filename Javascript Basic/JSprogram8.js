// Most frequent character (tie -> smallest character)
class Solution {
  mostFrequentChar(chars) {
    let maxFreq = 0;
    let maxChar = ""; // will hold smallest char on ties

    // Count frequencies with a Map
    const mpp = new Map();
    for (let i = 0; i < chars.length; i++) {
      const key = chars[i];
      if (mpp.has(key)) {
        mpp.set(key, mpp.get(key) + 1);
      } else {
        mpp.set(key, 1);
      }
    }

    // Pick most frequent; tie -> smaller character (traditional for over keys)
    const keys = Array.from(mpp.keys());
    for (let i = 0; i < keys.length; i++) {
      const ch = keys[i];
      const freq = mpp.get(ch);

      if (freq > maxFreq) {
        maxFreq = freq;
        maxChar = ch;
      } else if (freq === maxFreq) { //=== compares values and types
        if (ch < maxChar) {
          maxChar = ch; // lexicographically smaller wins
        }
      }
    }

    return maxChar;
  }
}

// --- Simple input (Node.js): read a string ---
// Counts EVERY character, including spaces and punctuation.
// If you want to ignore spaces, uncomment the replace() line below.
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Enter a string: ", (line) => {
  const chars = line.replace(/\s+/g, "").split("");//replace(/\s+/g, "")-> removes all spaces,tabs,newlines
  const sol = new Solution();
  const ans = sol.mostFrequentChar(chars);
  console.log("Most frequent character:", ans);
  rl.close();
});
