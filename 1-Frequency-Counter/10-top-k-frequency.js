/**LC- 347
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const count = {};
  let res = [];
  for (const num of nums) {
    count[num] = (count[num] || 0) + 1;
  }
  let sorted = [];
  for (let ele in count) {
    sorted.push([ele, count[ele]]);
  }
  sorted.sort((a, b) => b[1] - a[1]);
  let i = 0;
  while (k--) {
    res.push(+sorted[i][0]);
    i++;
  }

  return res;
};

//The Above code is of TC - O(nlogN)
// Mean while it can be done is O(n) TC, the best solution

function topKFrequentOp(nums, k) {
  const count = {};
  const freq = Array.from({ length: nums.length + 1 }, () => []);

  for (let item of nums) {
    count[item] = (count[item] || 0) + 1;
  }

  for (let item in count) {
    freq[count[item]].push(+item);
  }

  let res = [];
  for (let i = freq.length - 1; i > 0; i--) {
    for (let item of freq[i]) {
      res.push(item);
      if (res.length === k) return res;
    }
  }
}
