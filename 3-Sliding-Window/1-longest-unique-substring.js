//LC-3- Longest substring without repeating characters

//Brute Force
function lengthOfLongestSubstring(s) {
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    let charSet = new Set();
    for (let j = i; j < s.length; j++) {
      if (charSet.has(s[j])) {
        break;
      }
      charSet.add(s[j]);
    }
    res = Math.max(res, charSet.size);
  }
  return res;
}

//Optimized Sliding Window
function lengthOfLongestSubstringOp(s) {
  const charSet = new Set();
  let l = 0;
  let res = 0;

  for (let r = 0; r < s.length; r++) {
    while (charSet.has(s[r])) {
      charSet.delete(s[l]);
      l++;
    }
    charSet.add(s[r]);
    res = Math.max(res, r - l + 1);
  }
  return res;
}
