//LC-49
//Brute Force
function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  let freq1 = {};
  for (let s of str1) {
    freq1[s] = (freq1[s] || 0) + 1;
  }

  //   Checking for the same occurence of characters present in freq1 with str2;
  for (let item of str2) {
    if (!freq1[item]) return false;
    // if repetation is there delete the character -- IMP Step
    else freq1[item]--;
  }
  return true;
}

function groupAnagram(strs) {
  let grp = [];
  let tracker = [];
  if (strs.length <= 1) {
    grp.push(strs);
    return grp;
  }
  for (let i = 0; i < strs.length; i++) {
    let temp = [];
    let curr = strs[i];
    if (tracker.includes(curr)) continue;
    temp.push(curr);
    for (let j = i + 1; j < strs.length; j++) {
      let next = strs[j];
      let areAnagram = isAnagram(curr, next);
      if (areAnagram) {
        temp.push(next);
      }
    }
    tracker.push(...tracker, ...temp);
    grp.push(temp);
  }
  return grp;
}

// groupAnagram(["eat","tea","tan","ate","nat","bat"]);
groupAnagram(["a"]);

//Optimised

function groupAnagram(strs) {
  const fMap = new Map();
  const res = [];
  for (let item of strs) {
    const key = item.split("").sort().join();
    console.log(key);
    if (fMap.has(key)) {
      fMap.get(key).push(item);
    } else {
      fMap.set(key, [item]);
    }
  }
  for (let [, value] of fMap) {
    res.push(value);
  }
  return res;
}
