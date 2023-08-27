// LC-532
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findPairs = function (nums, k) {
  //using binary search
  let res = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) {
      continue;
    }
    const target = nums[i] + k;
    let left = i + 1,
      right = nums.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] == target) {
        res++;
        break;
      } else if (nums[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
  }
  return res;
};
