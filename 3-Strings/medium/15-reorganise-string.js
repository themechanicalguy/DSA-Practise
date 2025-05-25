// LC - 767

/**
 * @param {string} s
 * @return {string}
 */
let reorganizeString = (str) => {
  const res = new Array(str.length);
  let hashMap = new Map();
  // create a hashMap and store freq of all char
  for (let item of str) {
    hashMap.set(item, (hashMap.get(item) || 0) + 1);
  }
  // find the most frequent character
  let most_freq_char;
  let max_freq = -Infinity;
  for (let [key, values] of hashMap) {
    if (hashMap.get(key) > max_freq) {
      max_freq = hashMap.get(key);
      most_freq_char = key;
    }
  }

  // place the most occuring char adjacently
  let index = 0;
  while (max_freq > 0 && index < str.length) {
    res[index] = most_freq_char;
    max_freq--;
    index += 2;
  }
  // if not able to place then return ""
  if (max_freq !== 0) return "";

  // if most occuring is set adjacently, make its value 0
  hashMap.set(most_freq_char, 0);

  // place rest of characters
  for (let [key, value] of hashMap) {
    while (hashMap.get(key) > 0) {
      // check if index has gone out of length of string
      index = index >= str.length ? 1 : index;
      res[index] = key;
      hashMap.set(key, hashMap.get(key) - 1);
      index += 2;
    }
  }

  return res.join("");
};
