# July 27,2025

---

# LC - 33 Search in Rotated Sorted Array --1

SUBMITTED ON 3 FAILED ATTEMPTS

My approach

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (arr, target) {
  //Brute Force - Linear Search
  //Optimal Modified Binary Search
  let n = arr.length;
  let left = 0;
  let right = n - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) return mid;
    // check arr[mid] > arr[n-1] --left half is sorted
    if (arr[mid] >= arr[right]) {
      if (target >= arr[left] && target < arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // right half sorted
      if (target > arr[mid] && target <= arr[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};

//
/**
 * Search in Rotated Sorted Array (Single-pass Binary Search)
 * @param {number[]} nums - Rotated sorted array with distinct values
 * @param {number} target - Value to search for
 * @return {number} - Index of target if found, otherwise -1
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Case 1: Found the target
    if (nums[mid] === target) return mid;

    // FAILED IN THE BELOW STEP 2 TIMES

    // Case 2: Left half [left..mid] is sorted
    if (nums[left] <= nums[mid]) {
      // Check if target is within the left sorted half
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // Search left half
      } else {
        left = mid + 1; // Search right half
      }
    }
    // Case 3: Right half [mid..right] must be sorted (since left half isn't)
    else {
      // Check if target is within the right sorted half
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1; // Search right half
      } else {
        right = mid - 1; // Search left half
      }
    }
  }

  // Target not found
  return -1;
}
```

---

# LC- 81 Search in Rotated Sorted Array II --2

**Approach 1**

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (arr, target) {
  let nums = [...new Set(arr)];
  console.log(nums);

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Case 1: Found the target
    if (nums[mid] === target) return true;

    // Case 2: Left half [left..mid] is sorted
    if (nums[left] <= nums[mid]) {
      // Check if target is within the left sorted half
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // Search left half
      } else {
        left = mid + 1; // Search right half
      }
    }
    // Case 3: Right half [mid..right] must be sorted (since left half isn't)
    else {
      // Check if target is within the right sorted half
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1; // Search right half
      } else {
        right = mid - 1; // Search left half
      }
    }
  }

  // Target not found
  return false;
};

// Approach 2: Binary Search (Optimized) - withour using sets
/**
 * Binary search with rotation handling
 * Time Complexity: O(log n) average case, O(n) worst case (when many duplicates)
 * Space Complexity: O(1)
 */

function searchInRotatedArray(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Found the target
    if (nums[mid] === target) return true;

    // When left, mid and right elements are same, we can't decide which side is sorted
    // So we move both pointers inward
    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left++;
      right--;
    }
    // Left side is sorted
    else if (nums[left] <= nums[mid]) {
      // Target is in the left sorted part
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // Right side is sorted
    else {
      // Target is in the right sorted part
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return false;
}

// Test cases
const nums1 = [2, 5, 6, 0, 0, 1, 2];
const nums2 = [2, 5, 6, 0, 0, 1, 2];

console.log(searchInRotatedArray(nums1, 0)); // true
console.log(searchInRotatedArray(nums2, 3)); // false
```

---

# LC- 153 Find Minimum in Rotated Sorted Array -- 3

Given an integer array nums sorted in ascending order, rotated at some pivot unknown to you beforehand,
return the minimum element of this array.
You may assume no duplicates exist in the array.
Example 1:
Input: nums = [3,4,5,1,2]
Output: 1
Example 2:
Input: nums = [4,5,6,7,0,1,2]
Output: 0

- Failed for 2 attempts

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  // brute force linear search
  // optimal - binary search
  let n = nums.length;
  let left = 0;
  let right = n - 1;
  let min = Infinity;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    // check which side is sorted
    if (nums[left] <= nums[mid]) {
      //left half is sorted
      //get min from left half
      min = Math.min(min, nums[left]);
      left = mid + 1;
    } else {
      //right half is sorted and arr[min] is probably min
      min = Math.min(min, nums[mid]);
      right = mid - 1;
    }
  }
  return min;
};
```

---

# Find out how many times has an array been rotated --4

FAILED OPTIMAL

https://www.geeksforgeeks.org/problems/rotation4723/1

Find out how many times has an array been rotated
Given an array of size n, the task is to find the number of times the array has been rotated.
The rotation of the array is done by moving the first element to the end of the array.
The rotation of the array is done k times.
Example 1:
Input: arr[] = {1, 2, 3, 4, 5}
Output: 0
Explanation: The array is not rotated.
Example 2:
Input: arr[] = {3, 4, 5, 1, 2}
Output: 3
Explanation: The array is rotated 3 times.

```javascript
// Approach 1: Linear Search (Brute Force)
/**
 * Finds the number of rotations using linear search
 * @param {number[]} rotatedArray - The rotated array
 * @return {number} - The number of rotations
 */
function findRotationsLinear(rotatedArray) {
  // The number of rotations is equal to the index of the minimum element
  for (let i = 0; i < rotatedArray.length - 1; i++) {
    if (rotatedArray[i] > rotatedArray[i + 1]) {
      return i + 1;
    }
  }
  // If array is not rotated, return 0
  return 0;
}

// Example usage:
console.log(findRotationsLinear([1, 2, 3, 4, 5])); // Output: 0
console.log(findRotationsLinear([3, 4, 5, 1, 2])); // Output: 3

//Approach 2: Binary Search (Optimal for Sorted Arrays)
/**
 * Finds the number of rotations using binary search
 * @param {number[]} rotatedArray - The rotated array
 * @return {number} - The number of rotations
 */
function findRotationsBinary(rotatedArray) {
  const n = rotatedArray.length;
  let left = 0;
  let right = n - 1;

  while (left <= right) {
    // If array is already sorted
    if (rotatedArray[left] <= rotatedArray[right]) {
      return left;
    }

    const mid = Math.floor((left + right) / 2);
    //Imp to check rotation
    const next = (mid + 1) % n;
    const prev = (mid - 1 + n) % n;

    // Check if mid element is the smallest
    if (
      rotatedArray[mid] <= rotatedArray[next] &&
      rotatedArray[mid] <= rotatedArray[prev]
    ) {
      return mid;
    }
    // Decide which half to search
    else if (rotatedArray[mid] <= rotatedArray[right]) {
      right = mid - 1;
    } else if (rotatedArray[mid] >= rotatedArray[left]) {
      left = mid + 1;
    }
  }
  return 0;
}

// Example usage:
console.log(findRotationsBinary([1, 2, 3, 4, 5])); // Output: 0
console.log(findRotationsBinary([3, 4, 5, 1, 2])); // Output: 3
```

---

# Missing Number in Sorted Array of Natural Numbers --5

Finds the single element in a sorted array where every other element appears twice.

FAILED
ODD EVEN -- modified binary search pattern

```javascript
/**
 * Finds the single element in a sorted array where every other element appears twice.
 * @param {number[]} nums - The sorted array of integers.
 * @return {number} - The single element.
 */
function singleNonDuplicate(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    // Ensure mid is even to check pairs correctly
    if (mid % 2 === 1) {
      mid--; // Adjust mid to be even
    }
    // Check if mid and mid+1 are the same, then left side of mid is balanced
    if (nums[mid] === nums[mid + 1]) {
      // The single element is on the right side
      left = mid + 2;
    } else {
      // The single element is on the left side including mid
      right = mid;
    }
  }
  // When left === right, we've found the single element
  return nums[left];
}

singleNonDuplicate([1, 1, 2, 2, 3, 3, 4, 4, 8]);
// [0,1,2,3,4,5,6,7,8]
// [1,1,2,2,3,3,4,4,8]
```

### Dry Runs

**Example 1**: `nums = [1,1,2,3,3,4,4,8,8]`

- Initial: left = 0, right = 8
- mid = 4 (even), nums[4] = 3, nums[5] = 4 → not equal → right = 4
- mid = 2 (even), nums[2] = 2, nums[3] = 3 → not equal → right = 2
- mid = 1 (odd → adjust to 0), nums[0] = 1, nums[1] = 1 → equal → left = 2
- Now left = right = 2 → return nums[2] = 2

**Example 2**: `nums = [3,3,7,7,10,11,11]`

- Initial: left = 0, right = 6
- mid = 3 (odd → adjust to 2), nums[2] = 7, nums[3] = 7 → equal → left = 4
- mid = 5 (odd → adjust to 4), nums[4] = 10, nums[5] = 11 → not equal → right = 4
- Now left = right = 4 → return nums[4] = 10

# LC- 1539 Kth Missing Positive Number --6

FAILED

Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.
Find the kth positive integer that is missing from this array.
Example 1:
Input: arr = [2,3,4,7,11], k = 5
Output: 9
Explanation: The missing positive integers are [1,5,6,8,9,10,...]. The 5th missing positive integer is 9.
Example 2:
Input: arr = [1,2,3,4], k = 2
Output: 6
Explanation: The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.

### Intuition

The problem requires finding the k-th missing positive integer in a strictly increasing sorted array of positive integers. The missing integers are those positive integers that are not present in the array. For example, in the array `[2,3,4,7,11]`, the missing positive integers are `[1,5,6,8,9,10,12,...]`. The task is to find the k-th integer in this list of missing numbers.

### Approaches

There are several approaches to solve this problem:

1. **Brute Force (Linear Search)**:

   - Iterate through each positive integer starting from 1.
   - For each integer, check if it exists in the array. If it doesn't, count it as missing.
   - When the count reaches k, return the current integer.

2. **Binary Search (Optimal Approach)**:
   - The idea is to determine how many numbers are missing before each element in the array.
   - For any index `i`, the number of missing numbers before `arr[i]` is `arr[i] - (i + 1)` (since in a no-missing scenario, `arr[i]` would be `i + 1`).
   - Use binary search to find the smallest index `i` where the number of missing numbers before `arr[i]` is at least `k`.
   - The k-th missing number is then `k + i` (since up to index `i`, there are `i` numbers present, and the missing numbers before `arr[i]` are `arr[i] - (i + 1)`).

### Solution Code

#### Approach 1: Brute Force (Linear Search)

```javascript
/**
 * Finds the k-th missing positive integer using linear search.
 * @param {number[]} arr - The strictly increasing sorted array of positive integers.
 * @param {number} k - The k-th missing positive integer to find.
 * @return {number} The k-th missing positive integer.
 */
function findKthPositiveBruteForce(arr, k) {
  let missingCount = 0;
  let currentNumber = 1;
  let index = 0;
  const n = arr.length;

  while (missingCount < k) {
    if (index < n && arr[index] === currentNumber) {
      index++;
    } else {
      missingCount++;
    }
    if (missingCount === k) {
      return currentNumber;
    }
    currentNumber++;
  }
  return -1; // Shouldn't reach here for valid inputs
}
```

**Time Complexity**: O(n + k), where n is the length of the array. In the worst case, we might need to check up to `arr[n-1] + k` numbers.
**Space Complexity**: O(1), as we use a constant amount of extra space.

#### Approach 2: Binary Search (Optimal)

```javascript
/**
 * Finds the k-th missing positive integer using binary search.
 * @param {number[]} arr - The strictly increasing sorted array of positive integers.
 * @param {number} k - The k-th missing positive integer to find.
 * @return {number} The k-th missing positive integer.
 */
function findKthPositiveBinarySearch(arr, k) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const missingCount = arr[mid] - (mid + 1);

    if (missingCount < k) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // At this point, left is the smallest index where missingCount >= k
  // The k-th missing number is k + left
  return k + left;
}
```

**Time Complexity**: O(log n), where n is the length of the array. Binary search reduces the problem size by half in each iteration.
**Space Complexity**: O(1), as we use a constant amount of extra space.

### Dry Run of Optimal Approach (Binary Search)

#### Example 1:

**Input**: arr = [2,3,4,7,11], k = 5

1. **Initial**: left = 0, right = 4
2. **Mid = 2**: arr[2] = 4, missingCount = 4 - (2 + 1) = 1 < 5 → left = 3
3. **Mid = 3**: arr[3] = 7, missingCount = 7 - (3 + 1) = 3 < 5 → left = 4
4. **Mid = 4**: arr[4] = 11, missingCount = 11 - (4 + 1) = 6 >= 5 → right = 3
5. **Loop ends**: left = 4
6. **Result**: k + left = 5 + 4 = 9

**Output**: 9

#### Example 2:

**Input**: arr = [1,2,3,4], k = 2

1. **Initial**: left = 0, right = 3
2. **Mid = 1**: arr[1] = 2, missingCount = 2 - (1 + 1) = 0 < 2 → left = 2
3. **Mid = 2**: arr[2] = 3, missingCount = 3 - (2 + 1) = 0 < 2 → left = 3
4. **Mid = 3**: arr[3] = 4, missingCount = 4 - (3 + 1) = 0 < 2 → left = 4
5. **Loop ends**: left = 4
6. **Result**: k + left = 2 + 4 = 6

# LC 540 Single Element in a Sorted Array

# LC - 162 Find Peak Element

# Find pivot element in an array

# LC- 4. Median of Two Sorted Arrays
