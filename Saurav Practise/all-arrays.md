# Move zeroes - 15 July

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  if (nums.length <= 1) return nums;
  // given in array nums- move all 0's to end of array
  // constraint -- in place movement, maintaining relative order of non-zero items

  // [1,3,12,0,0] R !== 0 R++ [1,3,0]
  //         L
  //           R
  // [1,3,12,0,0]

  // [1,5,9,0,0]
  //        L
  //          R

  // writeP (left)
  // if readPtr !== 0
  // swap (check write shoul;d be zero)
  // writePtr++

  let writePtr = 0;
  let readPtr = 0;
  while (readPtr < nums.length) {
    if (nums[readPtr] !== 0) {
      [nums[readPtr], nums[writePtr]] = [nums[writePtr], nums[readPtr]];
      writePtr++;
    }
    readPtr++;
  }
};
```

---

# Union of 2 a sorted arrays

```javascript
// Function to return a list containing the union of the two arrays.
function findUnion(a, b) {
  // Brute force
  // const res = [...new Set([...a,...b])]
  // return res.sort((a,b)=>a-b)

  // given 2 sorted arrays
  // [1,2,3,4,5] [1,2,3,6,7]
  // i           j
  // arr[i]

  // 1. add only 1 items if common items
  // if(a[i] === a[j]) push a[i] result, increment i and j
  // if(arr[i] !== a[j])
  // add lesser item to res and increment
  // 2. ignore duplicates
  // while(i == i+1) i++; same for j, ensure items are in boundary
  let i = 0,
    j = 0;
  let m = a.length;
  let n = b.length;
  let res = [];

  while (i < m && j < n) {
    if (a[i] === b[j]) {
      res.push(a[i]);
      i++;
      j++;
    } else if (a[i] < b[j]) {
      res.push(a[i]);
      i++;
    } else {
      res.push(b[j]);
      j++;
    }
    while (a[i] === a[i - 1] && i > 0) i++;
    while (b[j] === b[j - 1] && j > 0) j++;
  }

  while (i < m) {
    res.push(a[i]);
    i++;
    while (a[i] === a[i - 1] && i > 0) i++;
  }
  while (j < n) {
    res.push(b[j]);
    j++;
    while (b[j] === b[j - 1] && j > 0) j++;
  }

  return res;
}
```

---

# Missing Number

**Math Solution**

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  // Given an integer array range of 0-n
  // output is the missing number from above array
  // Constraint - n distinct numbers

  // Find the sum of the given n nums
  // Calculate the ideal sum on number upto n
  // return differene which is the missing number
  let n = nums.length;
  const idealSum = Math.floor((n * (n + 1)) / 2);
  const currentSum = nums.reduce((acc, curr) => acc + curr, 0);

  return idealSum - currentSum;
};
```

---

# 485. Max Consecutive Ones

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  //given an binary array 0,1's
  // return count(integer) of max consecutive ones

  // create a global maxCount to keep track of max consecutive ones
  // creta a currentCount, an increment it evry iteration
  // when zero encountered, update maxCount, reset currentCount to zero

  let maxOnes = 0;
  let currentCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      currentCount = 0;
    } else {
      currentCount++;
    }
    maxOnes = Math.max(maxOnes, currentCount);
  }
  // maxOnes = Math.max(maxOnes, currentCount);
  return maxOnes;
};
```

---

# Longest Subarray with Sum K

## Prefix sum type I where preix sum is mapped to index of elements and compared.

## Prefix sum approach works with both positive and negative numbers where as sliding windo only works for pos numbers

https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1

```javascript
function longestSubarray(arr, k) {
  // code here
  //STEP-1
  // given an int arr(pos,neg) , int k
  // find the length of the longest subarray whose sum === k
  // output int i.e 6
  // not found return 0

  //STEP 2
  // bRUTE FORCE

  // Matching pattern - prefix sum

  // create a new arrya to store prefix sum
  const n = arr.length;
  const prefixSum = new Array(n);
  let maxLen = 0;
  // i.e
  // [94 -33 -13 40 -82 94 -33 -13 40 -82] 52
  // [10, 15, 17, 24, 25, 15]
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += arr[i];
    prefixSum[i] = sum;
  }
  console.log(prefixSum);
  // [10, 15, 17, 24, 25, 15]
  for (let i = 0; i < n; i++) {
    if (prefixSum[i] === k) {
      maxLen = Math.max(maxLen, i + 1);
    }
  }
  console.log(maxLen);
  // return maxLen;

  // now check in which places you have sum = k
  // then find the maxLen
  // subarray by left is zro, right 0-n
  // if nums[right] === 15, then maxlen = Math.max(maxLen, right-lrft+1)
}
```

FAILED: 3 CASES PASSED OUT OF 1115

Reason -
1- did not thought of complex examples
2- Only tried 1 example given in question
3- You skipped brute force directly jumped to optimal solution
3- implemented prefixSum in a wrong way

```javascript
function longestSubarrayPrefixSum(arr, k) {
  const prefixSumMap = new Map(); // Stores prefix sum and its earliest index
  let prefixSum = 0; // Running prefix sum
  let maxLength = 0; // Tracks the maximum length of subarray with sum k

  // Initialize map with prefix sum 0 at index -1 (before array starts)
  prefixSumMap.set(0, -1);

  // Iterate through the array
  for (let i = 0; i < arr.length; i++) {
    prefixSum += arr[i]; // Update prefix sum

    // If prefixSum - k exists in map, a subarray with sum k is found
    if (prefixSumMap.has(prefixSum - k)) {
      const startIndex = prefixSumMap.get(prefixSum - k);
      maxLength = Math.max(maxLength, i - startIndex); // Update max length
    }

    // Store prefix sum only if not seen or if this index is earlier
    if (!prefixSumMap.has(prefixSum)) {
      prefixSumMap.set(prefixSum, i);
    }
  }

  return maxLength;
}

// Test Case
const arr = [10, 5, 2, 7, 1, -10];
const k = 15;
console.log(longestSubarrayWithSumK(arr, k)); // Output: 6 (Correct)
```

---

# Longest Subarray with Sum K (only positive numbers)

## pattern - Sliding Window - Variable Sized

```javascript
function longestSubarraySlidingWindow(arr, k) {
  let maxLength = 0; // Tracks the maximum length of subarray with sum k
  let currentSum = 0; // Current sum of the sliding window
  let start = 0; // Start of the sliding window

  // Iterate over the array
  for (let end = 0; end < arr.length; end++) {
    currentSum += arr[end]; // Expand window by adding element

    // Shrink window while sum exceeds k
    while (currentSum > k && start <= end) {
      currentSum -= arr[start];
      start++;
    }

    // Check if current window sum equals k
    if (currentSum === k) {
      maxLength = Math.max(maxLength, end - start + 1); // Update max length
    }
  }

  return maxLength;
}
// Test Case
const arr = [10, 5, 2, 7, 1, 10];
const k = 15;
console.log(longestSubarrayWithSumK(arr, k)); // Output: 4
```

---

# Count the number of subarrays with given xor K

https:www.geeksforgeeks.org/problems/count-subarray-with-given-xor/1

Given an array of integers arr[] and a number k, count the number of subarrays having XOR of their elements as k.

Examples:
Input: arr[] = [4, 2, 2, 6, 4], k = 6
Output: 4
Explanation: The subarrays having XOR of their elements as 6 are [4, 2], [4, 2, 2, 6, 4], [2, 2, 6], and [6]. Hence, the answer is 4.

FAILED

```javascript
// Function to count subarrays with XOR equal to k using brute force
function countSubarraysBruteForce(arr, k) {
  const arrayLength = arr.length;
  let subarrayCount = 0;

  // Generate all possible subarrays using two nested loops
  for (let startIndex = 0; startIndex < arrayLength; startIndex++) {
    let currentXOR = 0;
    // Compute XOR for each subarray starting at startIndex
    for (let endIndex = startIndex; endIndex < arrayLength; endIndex++) {
      currentXOR ^= arr[endIndex];
      // If XOR equals k, increment the counter
      if (currentXOR === k) {
        subarrayCount++;
      }
    }
  }

  return subarrayCount;
}

// Example usage
const arrBrute = [4, 2, 2, 6, 4];
const targetXORBrute = 6;
console.log(
  "Brute Force Output:",
  countSubarraysBruteForce(arrBrute, targetXORBrute)
);

// Function to count subarrays with XOR equal to k using prefix XOR and HashMap
function countSubarraysWithHashMap(arr, k) {
  const arrayLength = arr.length;
  let subarrayCount = 0;
  let currentPrefixXOR = 0;

  // HashMap to store frequency of prefix XOR values
  const prefixXORFrequency = new Map();
  // Initialize with 0 XOR having frequency 1 (for cases where entire subarray XOR equals k)
  prefixXORFrequency.set(0, 1);

  // Iterate through the array
  for (let index = 0; index < arrayLength; index++) {
    // Compute prefix XOR up to current index
    currentPrefixXOR ^= arr[index];

    // If (currentPrefixXOR ^ k) exists in HashMap, add its frequency to count
    // Because currentPrefixXOR ^ somePreviousXOR = k implies a subarray with XOR k
    const requiredXOR = currentPrefixXOR ^ k;
    if (prefixXORFrequency.has(requiredXOR)) {
      subarrayCount += prefixXORFrequency.get(requiredXOR);
    }

    // Update the frequency of currentPrefixXOR in HashMap
    prefixXORFrequency.set(
      currentPrefixXOR,
      (prefixXORFrequency.get(currentPrefixXOR) || 0) + 1
    );
  }

  return subarrayCount;
}

// Example usage
const arrHashMap = [4, 2, 2, 6, 4];
const targetXORHashMap = 6;
console.log(
  "HashMap Output:",
  countSubarraysWithHashMap(arrHashMap, targetXORHashMap)
);
```

---

# Longest Subarray with Sum 0 - 17 July

```javascript
function maxLength(arr) {
  // code here
  //STEP-1
  // Given int arr containing pos & neg no.s , inp - arr
  // find the length of longest subarray with sum = 0
  // output - int
  // yes, maxLen, currSum,

  //STEP-2
  // Pattern - Prefix sum with index map
  // Explore examples -
  // [15,-2,2,-8,1,7,10,23]
  // { 0: -1,
  //   15 : 0,
  //   13: 1,
  //   5: 3,
  //   6:4,
  //   23:6

  // }
  let currSum = 0;
  let maxLen = 0;
  let prefixSum = new Map();
  prefixSum.set(0, -1);

  for (let i = 0; i < arr.length; i++) {
    currSum += arr[i];
    // check for currSum in prefixSum map
    if (prefixSum.has(currSum)) {
      let ind = prefixSum.get(currSum);
      maxLen = Math.max(maxLen, i - ind);
    } else {
      //else add sum tp prefixSum
      prefixSum.set(currSum, i);
    }
  }
  return maxLen;

  // if it exists, then get the index of where it is present and then sibstract it from i
  // maxLen = 3
}
```

---

# 1732. Find the Highest Altitude

```javascript
/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function (gain) {
  // Given an array of altitutue  saying bike start at 0 -> [-5,1,5,0,7] cover this altitude
  // return the highest altitude , integer

  // [-5,1,5,0,-7]
  // [0,-5,-4,1,1,-6]
  // Max of above array is ans
  let maxAlt = 0;
  let currSum = 0;
  // let altArr =[0];
  for (let i = 0; i < gain.length; i++) {
    currSum += gain[i];
    // altArr.push(currSum)
    maxAlt = Math.max(currSum, maxAlt);
  }

  // return Math.max(...altArr)
  return maxAlt;
};
```

---

# 724. Find Pivot Index - 18th July

Given an array of integers nums, calculate the **pivot index** of this array.

- The **pivot index** is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.

If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.

Return the leftmost **pivot index**. If no such index exists, return -1.

- Example 1:

Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation:
The pivot index is 3.
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11

- Example 2:

Input: nums = [1,2,3]
Output: -1
Explanation:
There is no index that satisfies the conditions in the problem statement.

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  // given inp- arr ints
  // op - int

  // calculate total sum of elements in the array
  const total = nums.reduce((acc, ele) => acc + ele, 0);
  let leftSum = 0;
  for (let i = 0; i < nums.length; i++) {
    rightSum = total - leftSum - nums[i];
    if (leftSum === rightSum) return i;
    leftSum += nums[i];
  }

  return -1;
  // find left sum by sum of all the element till that index
  // get right sum by substracting total sum - leftsum - indexitem
  // if left summ === right sum
  // found the item
};
```

---

# 53. Maximum Subarray - July 19

## How Kadane's Algorithm Works

The algorithm works by maintaining two variables as it iterates through the array:

1. `maxCurrent`: Maximum sum of the subarray ending at the current position
2. `maxGlobal`: Maximum sum found so far

At each element, the algorithm decides whether to:

- Start a new subarray at the current element, or
- Continue the previous subarray by adding the current element

```javascript
function kadanesAlgorithm(nums) {
  if (nums.length === 0) return 0;

  let maxCurrent = nums[0];
  let maxGlobal = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Decide whether to start new subarray or continue current one
    maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);

    // Update global maximum if current maximum is greater
    maxGlobal = Math.max(maxGlobal, maxCurrent);
  }

  return maxGlobal;
}
```

---

# 152. Maximum Product Subarray

Given an integer array nums, find a subarray that has the largest product, and return the product.

The test cases are generated so that the answer will fit in a 32-bit integer.

Example 1:

Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
Example 2:

Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.

## Solution

This problem can be solved in 2 approaches i.e kadanes algo and general observation
Kadane Algorithm is difficult here so go for the simple observation.

- If we have even -ive number then multiplication of entire array will be max sum
- If we have odd number of -ive nos. then either multiplication of all the elements from left to right will give maxProduct or right to left will give max product. It depends on the position of the odd -ive no. in the array.
- If you encounter **0 in array**, we need to reset the prod value to 1 again -- **VVI in this appraoch**

```javascript
function maxProductTwoPass(nums) {
  if (!nums || nums.length === 0) return 0;

  // Initialize maximum product
  let maxProduct = nums[0];
  let forwardProduct = 1;
  let backwardProduct = 1;

  // Forward pass: compute product from left to right
  for (let i = 0; i < nums.length; i++) {
    forwardProduct *= nums[i];
    maxProduct = Math.max(maxProduct, forwardProduct);
    // Reset product if zero is encountered
    if (forwardProduct === 0) forwardProduct = 1;
  }

  // Backward pass: compute product from right to left
  for (let i = nums.length - 1; i >= 0; i--) {
    backwardProduct *= nums[i];
    maxProduct = Math.max(maxProduct, backwardProduct);
    // Reset product if zero is encountered
    if (backwardProduct === 0) backwardProduct = 1;
  }

  return maxProduct;
}
```

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let n = nums.length;
  if (!nums || nums.length === 0) return 0;

  // Initialize maximum product
  let maxProduct = nums[0];
  let prefixMultiplication = 1;
  let suffixMultiplication = 1;

  for (let i = 0; i < nums.length; i++) {
    if (prefixMultiplication === 0) prefixMultiplication = 1;
    if (suffixMultiplication === 0) suffixMultiplication = 1;
    prefixMultiplication *= nums[i];
    suffixMultiplication *= nums[n - i - 1];
    maxProduct = Math.max(
      maxProduct,
      Math.max(prefixMultiplication, suffixMultiplication)
    );
  }

  return maxProduct;
};
```

---

# 918. Maximum Sum Circular Subarray --20 July

FAILED

```javascript
/**
 * Finds the maximum subarray sum in a circular array.
 * @param {number[]} nums - The circular array of integers.
 * @return {number} - The maximum subarray sum.
 */
function maxSubarraySumCircular(nums) {
  let totalSum = 0;
  let maxSum = nums[0];
  let currentMax = 0;
  let minSum = nums[0];
  let currentMin = 0;
  let allNegative = true;

  for (const num of nums) {
    totalSum += num;

    // Check if all numbers are negative
    if (num >= 0) {
      allNegative = false;
    }

    // Kadane's algorithm for max subarray
    currentMax = Math.max(num, currentMax + num);
    maxSum = Math.max(maxSum, currentMax);

    // Kadane's algorithm for min subarray
    currentMin = Math.min(num, currentMin + num);
    minSum = Math.min(minSum, currentMin);
  }

  // If all numbers are negative, return the maximum element
  if (allNegative) {
    return maxSum;
  }

  // The maximum is either the max subarray or the total sum minus the min subarray
  return Math.max(maxSum, totalSum - minSum);
}

// Example 1
// console.log(maxSubarraySumCircular([1, -2, 3, -2])); // Output: 3

// Example 2
// console.log(maxSubarraySumCircular([5, -3, 5])); // Output: 10

// Example 3
console.log(maxSubarraySumCircular([3, -1, 2, -1])); // Output: -2
```

# 1. Two Sum -- 21 July

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.

- Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

- Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Brute Force:-

- Use 2 loops to find the target and return indices of the found index

Optimized using hash map

- Create a map of item to index
- find the complimets in the hashMap
- return index and map index item for the found items

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const fMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    fMap.set(nums[i], i);
  }

  for (let i = 0; i < nums.length; i++) {
    let comp = target - nums[i];
    if (fMap.has(comp) && i !== fMap.get(comp)) {
      return [i, fMap.get(comp)];
    }
  }

  return -1;
};
```

---

# 15. 3Sum

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that `i != j, i != k, and j != k`, and `nums[i] + nums[j] + nums[k] == 0`

Notice that the solution set must not contain duplicate triplets.

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.

**Brute Force**

- Generate all possible combinations of three distinct elements
- Check if their sum equals zero
- Use a Set to store stringified versions of sorted triplets to avoid duplicates

```javascript
function threeSumAlternativeBruteForce(nums) {
  const result = [];
  const seen = new Set(); // To track unique triplets
  const n = nums.length;

  // Generate all possible triplets
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          // Create sorted triplet to check for uniqueness
          const triplet = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
          const tripletKey = triplet.join(",");

          if (!seen.has(tripletKey)) {
            seen.add(tripletKey);
            result.push(triplet);
          }
        }
      }
    }
  }

  return result;
}
```

Two Pointer Approach (Optimal) -- FAILED

- Sorting the array allows us to use a two-pointer technique, reducing the problem to finding two numbers that sum to a target.
- Fix one number (nums[i]) and find two other numbers (nums[j] and nums[k]) such that `nums[j] + nums[k] = -nums[i]`.
- Sorting helps skip duplicates and makes the two-pointer approach efficient.

```javascript
function threeSum(nums) {
  const result = [];
  // Sort the array to enable two-pointer technique
  nums.sort((a, b) => a - b);
  const n = nums.length;

  for (let i = 0; i < n - 2; i++) {
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        // Skip duplicates for left pointer -- fAILED ADDED THESE CONDITION AT END OF WHILE LOOP
        while (left < right && nums[left] === nums[left + 1]) left++;
        // Skip duplicates for right pointer -- fAILED ADDED THESE CONDITION AT END OF WHILE LOOP
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++; // Need a larger sum
      } else {
        right--; // Need a smaller sum
      }
    }

    while (nums[i] === nums[i + 1]) i++;
  }

  return result;
}
```

---

# 18. 4Sum

**BRUTE FORCE**

- Generate all possible combinations of three distinct elements
- Check if their sum equals zero
- Use a Set to store stringified versions of sorted triplets to avoid duplicates

```javascript
/**
 * Finds all unique quadruplets in the array that sum to target (Brute Force)
 * Time Complexity: O(n^4)
 * Space Complexity: O(n) for storing result
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[][]} - Array of quadruplets that sum to target
 */
function fourSumBruteForce(nums, target) {
  const result = [];
  const seenQuadruplets = new Set();
  const len = nums.length;

  // Iterate through all possible quadruplets
  for (let a = 0; a < len - 3; a++) {
    for (let b = a + 1; b < len - 2; b++) {
      for (let c = b + 1; c < len - 1; c++) {
        for (let d = c + 1; d < len; d++) {
          if (nums[a] + nums[b] + nums[c] + nums[d] === target) {
            // Sort quadruplet to ensure uniqueness
            const quadruplet = [nums[a], nums[b], nums[c], nums[d]].sort(
              (x, y) => x - y
            );
            const quadrupletKey = quadruplet.join(",");

            // Add to result if not seen before
            if (!seenQuadruplets.has(quadrupletKey)) {
              seenQuadruplets.add(quadrupletKey);
              result.push(quadruplet);
            }
          }
        }
      }
    }
  }

  return result;
}
```

**Optimized--Two Pointers Approach**

```javascript
/**
 * Finds all unique quadruplets in the array that sum to target (Two Pointers)
 * Time Complexity: O(n^3)
 * Space Complexity: O(1) or O(n) depending on sorting implementation
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[][]} - Array of quadruplets that sum to target
 */
function fourSumTwoPointers(nums, target) {
  const result = [];
  const len = nums.length;

  // Sort the array first
  nums.sort((x, y) => x - y);

  // Fix first two elements, use two pointers for the remaining two
  for (let a = 0; a < len - 3; a++) {
    // Skip duplicates for first element

    for (let b = a + 1; b < len - 2; b++) {
      // Skip duplicates for second element

      let left = b + 1;
      let right = len - 1;

      while (left < right) {
        const sum = nums[a] + nums[b] + nums[left] + nums[right];

        if (sum === target) {
          result.push([nums[a], nums[b], nums[left], nums[right]]);

          // Skip duplicates for left pointer
          while (left < right && nums[left] === nums[left + 1]) left++;
          // Skip duplicates for right pointer
          while (left < right && nums[right] === nums[right - 1]) right--;

          left++;
          right--;
        } else if (sum < target) {
          left++; // Need a larger sum
        } else {
          right--; // Need a smaller sum
        }
      }
      while (nums[b] === nums[b + 1]) b++;
    }
    while (nums[a] === nums[a + 1]) a++;
  }

  return result;
}
```

---

# 169. Majority Element

```javascript
function majorityElement(nums) {
  let candidate = null;
  let count = 0;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += num === candidate ? 1 : -1;
  }

  // Verification step (not needed per problem statement)
  // But good practice when majority isn't guaranteed
  count = 0;
  for (const num of nums) {
    if (num === candidate) count++;
  }

  return count > nums.length / 2 ? candidate : -1;
}

// Test cases
console.log(majorityElement([3, 2, 3])); // 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // 2
console.log(majorityElement([1])); // 1
console.log(majorityElement([4, 4, 4])); // 4
console.log(majorityElement([1, 3, 1, 3, 1, 2, 1])); // 1
```

# 229. Majority Element II

Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.

Example 1: Input: nums = [3,2,3], Output: [3]
Example 2: Input: nums = [1], Output: [1]
Example 3: Input: nums = [1,2], Output: [1,2]

Follow up: Could you solve the problem in linear time and in O(1) space?

```javascript
//Approach 1: Hash Map (Frequency Counting)

function majorityElementHashMap(nums) {
  const n = nums.length;
  const threshold = Math.floor(n / 3); // Calculate threshold (⌊n/3⌋)
  const frequencyMap = new Map(); // To store element frequencies
  const result = [];

  // Count frequency of each element
  for (let num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  // Check which elements exceed the threshold
  for (let [num, count] of frequencyMap) {
    if (count > threshold) {
      result.push(num);
    }
  }

  return result;
}
//Approach 2: Boyer-Moore Voting Algorithm (Extended for ⌊n/3⌋)

function majorityElementBoyerMoore(nums) {
  const n = nums.length;
  const threshold = Math.floor(n / 3); // Threshold for majority
  let candidate1 = null,
    candidate2 = null; // Two possible candidates
  let count1 = 0,
    count2 = 0; // Counters for candidates

  // First pass: Find potential candidates
  for (let num of nums) {
    if (candidate1 === num) {
      count1++;
    } else if (candidate2 === num) {
      count2++;
    } else if (count1 === 0) {
      candidate1 = num;
      count1 = 1;
    } else if (count2 === 0) {
      candidate2 = num;
      count2 = 1;
    } else {
      count1--;
      count2--;
    }
  }

  // Second pass: Count actual frequencies of candidates
  count1 = 0;
  count2 = 0;
  for (let num of nums) {
    if (num === candidate1) count1++;
    if (num === candidate2) count2++;
  }

  // Check which candidates exceed threshold
  const result = [];
  if (count1 > threshold) result.push(candidate1);
  if (count2 > threshold && candidate2 !== candidate1) result.push(candidate2);

  return result;
}
```

# 75. Sort Colors

```javascript
function sortColors(nums) {
  let low = 0;
  let high = nums.length - 1;
  let current = 0;

  while (current <= high) {
    if (nums[current] === 0) {
      // Swap with low pointer
      [nums[current], nums[low]] = [nums[low], nums[current]];
      low++;
      current++;
    } else if (nums[current] === 2) {
      // Swap with high pointer
      [nums[current], nums[high]] = [nums[high], nums[current]];
      high--;
      // Don't increment current as we need to check the new element
    } else {
      // It's 1, just move forward
      current++;
    }
  }
}
```

# Leaders in an Array problem

You are given an array arr of positive integers. Your task is to find all the leaders in the array.

- An element is considered a leader if it is greater than or equal to all elements to its right. The rightmost element is always a leader.

Examples: Input: arr = [16, 17, 4, 3, 5, 2], Output: [17, 5, 2]
Explanation: Note that there is nothing greater on the right side of 17, 5 and, 2.

Input: arr = [10, 4, 2, 4, 1], Output: [10, 4, 4, 1]
Explanation: Note that both of the 4s are in output, as to be a leader an equal element is also allowed on the right. side

Input: arr = [5, 10, 20, 40], Output: [40]
Explanation: When an array is sorted in increasing order, only the rightmost element is leader.

https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1

```javascript
//Brute force
function findLeadersBruteForce(numbers) {
  const leaders = [];
  const arrayLength = numbers.length;

  for (let currentIndex = 0; currentIndex < arrayLength; currentIndex++) {
    let isLeader = true;
    const currentNumber = numbers[currentIndex];
    // Check all elements to the right
    for (
      let rightIndex = currentIndex + 1;
      rightIndex < arrayLength;
      rightIndex++
    ) {
      if (currentNumber < numbers[rightIndex]) {
        isLeader = false;
        break;
      }
    }
    if (isLeader) {
      leaders.push(currentNumber);
    }
  }
  return leaders;
}

// Test
const testArray1 = [16, 17, 4, 3, 5, 2];
console.log(findLeadersBruteForce(testArray1)); // [17, 5, 2]

//Optimal Approach
function leaders(arr) {
  // code here
  let n = arr.length;
  let leader = [];
  let right = n - 1;
  leader.push(arr[right]);
  let max = arr[right];
  while (right > 0) {
    if (arr[right - 1] >= arr[right] && arr[right - 1] >= max) {
      leader.push(arr[right - 1]);
      max = Math.max(max, arr[right - 1]);
    }
    right--;
  }
  return leader.reverse();
}
```

---

# July 22

# 118. Pascal's Triangle

**Pascal's Triangle** is a triangular array of numbers where each number is the sum of the two directly above it. The triangle starts with a single `1` at the top, and each subsequent row starts and ends with `1`, with the interior numbers being the sum of the two numbers above them.

For example, the first 5 rows of Pascal's Triangle are:

```
Row 1: [1]
Row 2: [1, 1]
Row 3: [1, 2, 1]
Row 4: [1, 3, 3, 1]
Row 5: [1, 4, 6, 4, 1]
```

```javascript
/**
 * Generates Pascal's Triangle up to the given number of rows iteratively.
 * @param {number} numRows - The number of rows to generate.
 * @return {number[][]} - The generated Pascal's Triangle.
 */
function generatePascalsTriangle(numRows) {
  if (numRows === 0) return [];

  const triangle = [[1]]; // Initialize with the first row

  for (let currentRow = 1; currentRow < numRows; currentRow++) {
    const previousRow = triangle[currentRow - 1];
    const newRow = [1]; // First element is always 1

    for (let col = 1; col < currentRow; col++) {
      // Each element is the sum of the two elements above it
      newRow.push(previousRow[col - 1] + previousRow[col]);
    }

    newRow.push(1); // Last element is always 1
    triangle.push(newRow);
  }

  return triangle;
}

// Example Usage:
console.log(generatePascalsTriangle(5));
// Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
```

---

# 31. Next Permutation

Example 1:

Input: nums = [1,2,3]
Output: [1,3,2]
Example 2:

Input: nums = [3,2,1]
Output: [1,2,3]
Example 3:

Input: nums = [1,1,5]
Output: [1,5,1]

### 2. Brute Force Approach (Not Recommended)

This approach would generate all permutations, sort them, and find the next one. However, it's impractical for larger arrays due to O(n!) time complexity.

## Understanding the Problem

- A permutation is an arrangement of elements in a specific order.
- The "next permutation" is the lexicographically next greater arrangement of numbers.

If no such arrangement exists (like [3,2,1]), we return the smallest possible permutation ([1,2,3]).

## Intuition

To find the next permutation, we need to:

1. Find the first decreasing element from the end (pivot)
2. Find the smallest element larger than the pivot to its right
3. Swap them
4. Reverse the suffix after the pivot to get the smallest possible order

This approach ensures we get the next permutation in lexicographical order with minimal changes.

## Approaches

### 1. Optimal Approach (Single Pass)

This is the most efficient approach with O(n) time and O(1) space.

```javascript
/**
 * Finds the next permutation of the given array in-place.
 * @param {number[]} nums - The array to modify
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums) {
  // Step 1: Find the first decreasing element from the end (pivot)
  let pivotPoint = -1;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      pivotPoint = i;
      break;
    }
  }

  // Step 2- Edge Case- if pivotPoint = -1; just reverse the array and return
  if (pivotPoint === -1) {
    nums.reverse();
    return nums;
  }

  // Step 3: Find the smallest element larger than nums[pivotPoint] to its right
  // take pivotPoint element and compare from the last value of array and find the next max value and swap, break
  for (let i = nums.length - 1; i > pivotPoint; i--) {
    if (nums[pivotPoint] < nums[i]) {
      [nums[pivotPoint], nums[i]] = [nums[i], nums[pivotPoint]];
      break;
    }
  }

  // Step 4: Reverse the suffix after the pivotPoint
  let left = pivotPoint + 1;
  let right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }

  return nums;
}
```

---

# 56. Merge Intervals || Merge Overlapping Subintervals

Given an array of intervals where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

Example 1:

Input: intervals = `[[1,3],[2,6],[8,10],[15,18]]` Output: `[[1,6],[8,10],[15,18]]`
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

Example 2:

Input: intervals = `[[1,4],[4,5]]` Output: `[[1,5]]`
Explanation: Intervals [1,4] and [4,5] are considered overlapping.

### **Intuition and Approach**

1. **Sort the Intervals**: First, sort the intervals based on their start times. This allows us to process them in order and easily check for overlaps with the previous interval.
2. **Iterate and Merge**: Initialize a result array with the first interval. For each subsequent interval, compare its start with the end of the last interval in the result array:
   - If they overlap, merge them by updating the end of the last interval in the result.
   - If they don't overlap, add the current interval to the result array.

### **Pattern Identification**

This problem follows the **Merge Intervals** pattern, where sorting the intervals first simplifies the merging process. The key insight is that after sorting, overlapping intervals will be adjacent, making it easy to merge them in a single pass.

#### **1. Sorting and Merging (Optimal Approach)**

```javascript
function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];

  // Sort intervals based on the start time
  intervals.sort((a, b) => a[0] - b[0]);

  const mergedIntervals = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i];
    const lastMergedInterval = mergedIntervals[mergedIntervals.length - 1];

    // Check for overlap
    if (currentInterval[0] <= lastMergedInterval[1]) {
      // Merge the intervals by updating the end of the last merged interval
      lastMergedInterval[1] = Math.max(
        lastMergedInterval[1],
        currentInterval[1]
      );
    } else {
      // No overlap, add the current interval to the result
      mergedIntervals.push(currentInterval);
    }
  }

  return mergedIntervals;
}

// Example Usage
const intervals1 = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];
console.log(mergeIntervals(intervals1)); // Output: [[1, 6], [8, 10], [15, 18]]

const intervals2 = [
  [1, 4],
  [4, 5],
];
console.log(mergeIntervals(intervals2)); // Output: [[1, 5]]

const intervals3 = [
  [1, 4],
  [0, 4],
];
console.log(mergeIntervals(intervals3)); // Output: [[0, 4]]
```

---

# Longest Consecutive Sequence in an Array

Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
You must write an algorithm that runs in O(n) time.

- Example 1:

- Input: nums = [100,4,200,1,3,2] Output: 4
- Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

Example 2:

- Input: nums = [0,3,7,2,5,8,4,6,0,1] Output: 9

**FAILED**

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  // Given - unsorted int arr [100,4,200,1,3,2]
  // return length of longest consecutive sequence
  //Approach 1- Sort and find
  const fmap = {};

  for (let item of nums) {
    fmap[item] = item;
  }
  console.log(fmap);
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0 && fmap[nums[i] + 1]) count++;
    if (fmap[nums[i] - 1]) {
      count++; //3
    }
    // while(nums[i] === nums[i+1]) i++;
  }

  return count;
};

//Correct Approach
function longestConsecutive(nums) {
  // Create a set of all unique numbers for O(1) lookups -- without set this approach FAIL
  const numSet = new Set(nums);
  let maxLength = 0;

  // Check each unique number in the set ---loop over set not the original array
  for (const num of numSet) {
    // Only process if this number is the start of a sequence
    // (i.e., no number immediately before it exists) -- Most important step for logic to work
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1; // Start new streak

      // Count how long this consecutive sequence goes
      while (numSet.has(currentNum + 1)) {
        currentNum++; // Move to next number
        currentStreak++; // Increase streak length
      }

      // Update max length if this streak is longer
      maxLength = Math.max(maxLength, currentStreak);
    }
    // If num-1 exists, we'll process it when we reach that number
  }

  return maxLength;
}
```

---

# 2149. Rearrange Array Elements by Sign

FAILED APPROACH

```javascript
var rearrangeArrayF = function (nums) {
  //Given an arr of pos & neg ints(equal nos. of pos & neg number)
  // return arr in consecutive pair of pos neg. pos first starts, preserving the order
  const res = new Array(nums.length).fill(0);
  let posIndex = 0;
  let negIndex = 0;

  //[-2,-1,-3,1,2,3]
  //[1,-2,2,-1,3,-3]

  //loop from 0 to nums-1
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    //check if item is positive or negative
    //Find the first positive number and add it to res[0]
    while (num < 0 && i < nums.length) {
      i++;
    }
  }
};

//Brute force Approach

//Using 2 arrays
var rearrangeArray = function (nums) {
  const posArr = [];
  const negArr = [];
  for (let item of nums) {
    if (item < 0) negArr.push(item);
    else posArr.push(item);
  }

  let i = 0,
    j = 0;
  let k = 0;
  while (k < nums.length) {
    if (k % 2 === 0) {
      nums[k] = posArr[i];
      k++;
      i++;
    } else {
      nums[k] = negArr[j];
      k++;
      j++;
    }
  }

  return nums;
};

// Effecient Approach
function rearrangeArrayOpt(nums) {
  // First, count positives to ensure we start with positive
  const result = new Array(nums.length);
  let posIndex = 0; // Index for positive numbers
  let negIndex = 1; // Index for negative numbers

  // Place all positives at even indices
  for (let num of nums) {
    if (num > 0) {
      result[posIndex] = num;
      posIndex += 2;
    }
  }

  // Place all negatives at odd indices
  for (let num of nums) {
    if (num < 0) {
      result[negIndex] = num;
      negIndex += 2;
    }
  }

  return result;
}
```

# Merge Sort

# Count Inversions

# Reverse Pairs

# Print the matrix in spiral manner

# Rotate Matrix by 90 degrees

# Set Matrix Zeros

# 136. Single Number 16th july
