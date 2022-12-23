// 3. Longest Substring Without Repeating Characters
/**
const subNoRepeat = (s) => {
  let subStr = '';
  let maxLen = '';
  for (let i = 0; i < s.length; i++) {
    subStr = subStr.split(s[i]);
    subStr = subStr[subStr.length - 1] + s[i];

    if (maxLen.length < subStr.length) {
      maxLen = subStr;
    }
  }
  return maxLen;
};

console.log(subNoRepeat('pwwkew'));
*/

// OPTIMIZED APPROACH (SLIDING WINDOW APPROACH)
const subNoRepeat = (s) => {
  let maxLen;
  let j = 0;
  const record = {};
  for (let i = 0; i < s.length; i++) {
    j = Math.max(j, (record[s[i]] ?? -1) + 1);
    record[s[i]] = i;
    maxLen = Math.max(maxLen, i - j + 1);
  }
  return maxLen;
};

console.log(subNoRepeat(' '));
