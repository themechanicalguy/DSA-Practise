//LC-1671

// Time: O(n^2) Space: O(n)
function minimumMountainRemovals(nums) {
  const n = nums.length;
  const lis = Array(n).fill(1); // Longest Increasing Subsequence
  const lds = Array(n).fill(1); // Longest Decreasing Subsequence

  // Step 1: Calculate LIS from the left
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        lis[i] = Math.max(lis[i], lis[j] + 1);
      }
    }
  }

  // Step 2: Calculate LDS from the right
  for (let i = n - 2; i >= 0; i--) {
    for (let j = n - 1; j > i; j--) {
      if (nums[i] > nums[j]) {
        lds[i] = Math.max(lds[i], lds[j] + 1);
      }
    }
  }

  // Step 3: Find max mountain length (peak not at edges)
  let maxMountain = 0;
  for (let i = 1; i < n - 1; i++) {
    if (lis[i] > 1 && lds[i] > 1) {
      maxMountain = Math.max(maxMountain, lis[i] + lds[i] - 1);
    }
  }

  // Step 4: Minimum removals
  return n - maxMountain;
}

//binary search approach
// Time: O(nlogn) Space: O(n)

/**
 * Calculates the minimum number of removals to make the array a mountain.
 * @param {number[]} nums - The input integer array.
 * @return {number} - Minimum removals required.
 */
function minimumMountainRemovals(nums) {
  const n = nums.length;

  /**
   * Helper function to compute the LIS length ending at each index.
   * Uses Binary Search (Patience Sorting) → O(n log n).
   * @param {number[]} arr - The input array.
   * @return {number[]} - LIS length for each element.
   */
  function getLIS(arr) {
    const lis = Array(arr.length).fill(1); // Initialize LIS lengths
    const tails = []; // Will store the smallest possible tail for LIS of various lengths

    for (let i = 0; i < arr.length; i++) {
      let left = 0,
        right = tails.length;

      // Binary search to find position to insert arr[i] in tails
      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        tails[mid] < arr[i] ? (left = mid + 1) : (right = mid);
      }

      // If left == tails.length → new longer LIS found, push element
      if (left === tails.length) {
        tails.push(arr[i]);
      } else {
        tails[left] = arr[i]; // Replace existing tail with smaller value
      }

      lis[i] = left + 1; // LIS length at position i
    }

    return lis;
  }

  // Step 1: Compute LIS from the left
  const lis = getLIS(nums);

  // Step 2: Compute LIS from the right (reverse array for LDS calculation)
  const reversedLds = getLIS(nums.slice().reverse());
  const lds = reversedLds.reverse(); // Re-reverse to align indices

  let maxMountain = 0;

  // Step 3: Find the maximum mountain length with a valid peak
  for (let i = 1; i < n - 1; i++) {
    if (lis[i] > 1 && lds[i] > 1) {
      // Valid peak condition
      const mountainLength = lis[i] + lds[i] - 1; // Peak counted twice → subtract 1
      maxMountain = Math.max(maxMountain, mountainLength);
    }
  }

  // Step 4: Minimum removals = total length - max mountain length
  return n - maxMountain;
}
