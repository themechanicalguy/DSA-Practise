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

# 724. Find Pivot Index - 18th July

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
