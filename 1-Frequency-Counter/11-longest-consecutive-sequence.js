//This is not a Frequency Counter Pattern
//LC- 128

//Brute Force - O(n2);

function longestConsecutive(nums) {
  let res = 0;
  const store = new Set(nums);

  for (let num of nums) {
    let streak = 0,
      curr = num;
    while (store.has(curr)) {
      streak++;
      curr++;
    }
    res = Math.max(res, streak);
  }
  return res;
}

//Sorting Approach - O(nlogn)

function longestConsecutiveSort(nums) {
  if (nums.length === 0) {
    return 0;
  }
  nums.sort((a, b) => a - b);

  let res = 0,
    curr = nums[0],
    streak = 0,
    i = 0;

  while (i < nums.length) {
    if (curr !== nums[i]) {
      curr = nums[i];
      streak = 0;
    }
    //Condition to smoothly handle duplicate items in between sequence
    while (i < nums.length && nums[i] === curr) {
      i++;
    }
    streak++;
    curr++;
    res = Math.max(res, streak);
  }
  return res;
}

function longestConsecutiveOptimum(nums) {
  const numSet = new Set(nums);
  let longest = 0;

  for (let num of numSet) {
    if (!numSet.has(num - 1)) {
      let length = 1;
      while (numSet.has(num + length)) {
        length++;
      }
      longest = Math.max(longest, length);
    }
  }
  return longest;
}

longestConsecutive([100, 4, 200, 1, 3, 2]);
