// LC - 49

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const fMap = new Map();
  const res = [];
  for (let item of strs) {
    const key = item.split("").sort().join("");
    if (fMap.has(key)) {
      fMap.get(key).push(item);
    } else {
      fMap.set(key, [item]);
    }
  }
  for (let [key, value] of fMap) {
    res.push(value);
  }
  return res;
};
