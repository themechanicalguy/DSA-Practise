//LC- 75

// App-1 Counting Sort (O(n) Time, O(1) Space)
function sortColors(nums) {
  let count0 = 0,
    count1 = 0,
    count2 = 0;

  for (let num of nums) {
    if (num === 0) count0++;
    else if (num === 1) count1++;
    else count2++;
  }

  for (let i = 0; i < nums.length; i++) {
    if (i < count0) nums[i] = 0;
    else if (i < count0 + count1) nums[i] = 1;
    else nums[i] = 2;
  }
}

// Example usage:
let nums = [2, 0, 2, 1, 1, 0];
sortColors(nums);
console.log(nums); // Output: [0, 0, 1, 1, 2, 2]

//App - 2. Dutch National Flag Algorithm (Optimal - O(n) Time, O(1) Space)
function sortColors(nums) {
  let low = 0,
    mid = 0,
    high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}

// Example usage:
let nums = [2, 0, 2, 1, 1, 0];
sortColors(nums);
console.log(nums); // Output: [0, 0, 1, 1, 2, 2]
