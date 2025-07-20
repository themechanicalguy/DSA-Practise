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

# 136. Single Number 16th july

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

# Count the number of subarrays with given xor K

https:www.geeksforgeeks.org/problems/count-subarray-with-given-xor/1

Given an array of integers arr[] and a number k, count the number of subarrays having XOR of their elements as k.

Examples:
Input: arr[] = [4, 2, 2, 6, 4], k = 6
Output: 4
Explanation: The subarrays having XOR of their elements as 6 are [4, 2], [4, 2, 2, 6, 4], [2, 2, 6], and [6]. Hence, the answer is 4.

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

# Next Permutation

---

# 1. Two Sum

# 75. Sort Colors

# 15. 3Sum

# 18. 4Sum

# 169. Majority Element

# 229. Majority Element II

---

# July 20

# 118. Pascal's Triangle

# Count Inversions

# Reverse Pairs
