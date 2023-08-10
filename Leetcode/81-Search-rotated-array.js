/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
  let l = 0,
    r = nums.length - 1;

  while (l <= r) {
    let mid = Math.floor((r + l) / 2);
    if (nums[mid] == target || nums[r] === target || nums[l] === target)
      return true;
    if (nums[l] == nums[r]) {
      ++l;
      --r;
      continue;
      // return search(arr, l, h, key)
    }

    if (
      (target < nums[l] && target < nums[r]) ||
      (target > nums[l] && target > nums[r])
    ) {
      l++;
      r--;
    } else if (target < nums[mid]) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return false;
};
