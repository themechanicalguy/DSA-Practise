//LC-31. Next Permutation

// Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.
// If such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order).
// The replacement must be in place and use only constant extra memory.

// Example 1:
// Input: nums = [1,2,3]
// Output: [1,3,2]

//Brute force

function nextPermutationAll(arr) {
  // Helper function to get all permutations
  function getAllPermutations(nums) {
    if (nums.length <= 1) return [nums];

    const result = [];
    for (let i = 0; i < nums.length; i++) {
      const current = nums[i];
      const remaining = [...nums.slice(0, i), ...nums.slice(i + 1)];
      const perms = getAllPermutations(remaining);

      for (let perm of perms) {
        result.push([current, ...perm]);
      }
    }
    return result;
  }

  // Convert array to string for comparison
  const originalStr = arr.join("");

  // Get all permutations and sort them
  const allPerms = getAllPermutations(arr)
    .map((perm) => perm.join(""))
    .sort();

  // Find next permutation
  const currentIndex = allPerms.indexOf(originalStr);
  if (currentIndex === allPerms.length - 1) {
    return allPerms[0].split("").map(Number);
  }

  return allPerms[currentIndex + 1].split("").map(Number);
}

// Test cases
console.log(nextPermutationAll([1, 2, 3])); // [1,3,2]
console.log(nextPermutationAll([3, 2, 1])); // [1,2,3]
console.log(nextPermutationAll([1, 1, 5])); // [1,5,1]

// Approach 2- Standard Algorithm Approach (In-Place Modification): Optimal

function nextPermutation(arr) {
  // Find first decreasing element from right
  let pivotIndex = arr.length - 2;
  while (pivotIndex >= 0 && arr[pivotIndex] >= arr[pivotIndex + 1]) {
    pivotIndex--;
  }

  // If no such element found, return sorted array
  if (pivotIndex < 0) {
    return arr.sort((a, b) => a - b);
  }

  // Find number just larger than arr[pivotIndex]
  let swapIndex = arr.length - 1;
  while (swapIndex >= 0 && arr[swapIndex] <= arr[pivotIndex]) {
    swapIndex--;
  }

  // Swap the two numbers
  [arr[pivotIndex], arr[swapIndex]] = [arr[swapIndex], arr[pivotIndex]];

  // Reverse the subarray after pivotIndex
  let leftPointer = pivotIndex + 1;
  let rightPointer = arr.length - 1;
  while (leftPointer < rightPointer) {
    [arr[leftPointer], arr[rightPointer]] = [
      arr[rightPointer],
      arr[leftPointer],
    ];
    leftPointer++;
    rightPointer--;
  }

  return arr;
}
