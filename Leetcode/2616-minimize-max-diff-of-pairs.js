/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
var minimizeMax = function (nums, p) {
  const isFullfilled = (maxDif) => {
    let count = 0;
    let i = 1;
    while (i < nums.length) {
      if (nums[i] - nums[i - 1] <= maxDif) {
        count++;
        i += 2;
      } else {
        i++;
      }
    }
    if (count >= p) return true;
    return false;
  };
  nums.sort((a, b) => a - b);

  let low = 0,
    high = nums[nums.length - 1] - nums[0];
  // let mid = nums[0] + (nums[nums.length - 1] +nums[0]) /2;
  while (low < high) {
    let mid = low + Math.floor((high - low) / 2);
    if (isFullfilled(mid)) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return high;
};

const arr = [10, 1, 2, 7, 1, 3];
console.log(minimizeMax(arr, 2);)
