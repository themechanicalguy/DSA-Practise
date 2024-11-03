//First non repeating character in a stream

function nonRepeating(str) {
  //create freqMap
  const freqMap = {};
  const queue = [];
  let ans;
  for (let item of str) {
    freqMap[item] = (freqMap[item] || 0) + 1;
    queue.push(item);
    while (queue.length > 0) {
      if (freqMap[queue[0]] > 1) {
        queue.shift();
      } else {
        ans = queue[0];
        break;
      }
    }
  }
  return ans;
}

console.log(nonRepeating("abacbdrcxd"));
