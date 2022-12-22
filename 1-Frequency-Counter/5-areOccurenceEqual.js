var areOccurrencesEqual = function (s) {
  const freqMap = new Map();
  for (let i = 0; i < s.length; i++) {
    let key = s[i];
    //key is not there in map, then add to map and increment count
    if (!freqMap.has(key)) {
      freqMap.set(key, 1);
    } else {
      freqMap.set(key, freqMap.get(key) + 1);
    }
  }
  // m.entries().next().value
  const [_, no] = freqMap.entries().next().value;
  for (let [key, value] of freqMap.entries()) {
    console.log(key, value, "hi");
    if (freqMap[key] !== no) {
      return false;
    }
  }
  return true;
};
areOccurrencesEqual("aaabb");
