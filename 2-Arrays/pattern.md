# Problem Pattern Approaches for Arrays in DSA

Arrays are fundamental data structures in programming, and recognizing common problem patterns can help you solve array-related problems more efficiently. Here are the major patterns with examples in JavaScript:

## 1. Two Pointers Technique

**When to use**: When you need to process elements in a sequence while comparing or combining them in some way.

**Variations**:

- One pointer at each end (for sorted arrays)
- Both pointers at the start (for sliding window or removing duplicates)
- Fast and slow pointers (for cycle detection)

**Example: Two Sum (sorted array)**

```javascript
function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}

console.log(twoSumSorted([2, 7, 11, 15], 9)); // [0, 1]
```

## 2. Sliding Window

**When to use**: When dealing with subarrays or substrings where you need to find/calculate something among all contiguous subarrays of a given size.

**Example: Maximum Sum Subarray of Size K**

```javascript
function maxSubarraySum(nums, k) {
  let maxSum = 0;
  let windowSum = 0;
  let start = 0;

  for (let end = 0; end < nums.length; end++) {
    windowSum += nums[end];

    if (end >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= nums[start];
      start++;
    }
  }

  return maxSum;
}

console.log(maxSubarraySum([2, 1, 5, 1, 3, 2], 3)); // 9 (subarray [5, 1, 3])
```

## 3. Prefix Sum (Cumulative Sum)

**When to use**: When you need to frequently calculate the sum of subarrays or need range sum queries.

**Example: Range Sum Query - Immutable**

```javascript
class NumArray {
  constructor(nums) {
    this.prefixSum = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
      this.prefixSum[i + 1] = this.prefixSum[i] + nums[i];
    }
  }

  sumRange(left, right) {
    return this.prefixSum[right + 1] - this.prefixSum[left];
  }
}

const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(numArray.sumRange(0, 2)); // 1
console.log(numArray.sumRange(2, 5)); // -1
```

## 4. Cyclic Sort

**When to use**: When dealing with arrays containing numbers in a given range (like 1 to n) and you need to sort them in O(n) time with O(1) space.

**Example: Find All Missing Numbers**

```javascript
function findDisappearedNumbers(nums) {
  let i = 0;
  while (i < nums.length) {
    const correctPos = nums[i] - 1;
    if (nums[i] !== nums[correctPos]) {
      [nums[i], nums[correctPos]] = [nums[correctPos], nums[i]];
    } else {
      i++;
    }
  }

  const missing = [];
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== j + 1) {
      missing.push(j + 1);
    }
  }

  return missing;
}

console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])); // [5, 6]
```

## 5. In-place Reversal

**When to use**: When you need to reverse an array or parts of it without using extra space.

**Example: Rotate Array**

```javascript
function rotate(nums, k) {
  k = k % nums.length;

  // Reverse entire array
  reverse(nums, 0, nums.length - 1);
  // Reverse first k elements
  reverse(nums, 0, k - 1);
  // Reverse remaining elements
  reverse(nums, k, nums.length - 1);

  return nums;
}

function reverse(nums, start, end) {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}

console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3)); // [5, 6, 7, 1, 2, 3, 4]
```

## 6. Merge Intervals

**When to use**: When dealing with overlapping intervals and you need to merge or find intersections.

**Example: Merge Intervals**

```javascript
function merge(intervals) {
  if (intervals.length <= 1) return intervals;

  // Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const current = intervals[i];

    if (current[0] <= last[1]) {
      // Overlapping intervals, merge them
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }

  return merged;
}

console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ])
); // [[1, 6], [8, 10], [15, 18]]
```

You're absolutely right! The **Frequency Counter** pattern is a crucial technique for solving array problems efficiently. Here's a detailed explanation with JavaScript examples:

---

# Frequency Counter Pattern

**When to use**:

- When you need to compare elements between two arrays or track frequencies of elements
- When you need O(1) lookups/insertions to avoid O(n²) nested loops
- Problems involving anagrams, duplicates, or element comparisons

**Key Idea**: Use an object (or Map) to store the frequencies of elements, then use this map for efficient lookups.

---

## Example 1: Anagram Check

```javascript
function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;

  const frequency = {};

  // Count frequencies for str1
  for (const char of str1) {
    frequency[char] = (frequency[char] || 0) + 1;
  }

  // Decrement frequencies for str2
  for (const char of str2) {
    if (!frequency[char]) return false; // Character doesn't exist
    frequency[char]--;
  }

  return true;
}

console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car")); // false
```

---

## Example 2: Find All Duplicates in Array

```javascript
function findDuplicates(nums) {
  const frequency = {};
  const duplicates = [];

  for (const num of nums) {
    frequency[num] = (frequency[num] || 0) + 1;
    if (frequency[num] === 2) {
      duplicates.push(num);
    }
  }

  return duplicates;
}

console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1])); // [2, 3]
```

---

## Example 3: Two Sum (Unsorted Array)

```javascript
function twoSum(nums, target) {
  const numMap = {}; // Stores { number: index }

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (complement in numMap) {
      return [numMap[complement], i];
    }
    numMap[nums[i]] = i;
  }

  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]
```

---

## Example 4: Count Unique Values

```javascript
function countUniqueValues(arr) {
  const frequency = {};
  for (const val of arr) {
    frequency[val] = true;
  }
  return Object.keys(frequency).length;
}

// Alternative for sorted arrays (better space complexity):
function countUniqueValuesSorted(arr) {
  if (arr.length === 0) return 0;
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}

console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
```

---

## Example 5: First Non-Repeating Character

```javascript
function firstUniqChar(s) {
  const frequency = {};

  // Build frequency map
  for (const char of s) {
    frequency[char] = (frequency[char] || 0) + 1;
  }

  // Find first character with frequency 1
  for (let i = 0; i < s.length; i++) {
    if (frequency[s[i]] === 1) {
      return i;
    }
  }

  return -1;
}

console.log(firstUniqChar("leetcode")); // 0 ('l')
console.log(firstUniqChar("loveleetcode")); // 2 ('v')
```

---

## When to Choose Frequency Counter Over Other Patterns

1. **vs Two Pointers**:

   - Use frequency counter when elements are unsorted
   - Use two pointers when array is sorted and you need O(1) space

2. **vs Nested Loops**:

   - Always prefer frequency counter over O(n²) solutions when possible

3. **vs Bit Manipulation**:
   - Frequency counter is more readable for counting problems

---

## Time Complexity Analysis

| Operation       | Time with Frequency Counter | Naive Approach            |
| --------------- | --------------------------- | ------------------------- |
| Find duplicates | O(n)                        | O(n²)                     |
| Two sum         | O(n)                        | O(n²)                     |
| Anagram check   | O(n)                        | O(n log n) [with sorting] |

The frequency counter pattern typically provides O(n) time complexity by trading space for time (O(n) space).

This pattern is fundamental for array problems and often serves as the first optimization step when nested loops appear in your initial solution.

## How to Identify the Pattern

1. **Analyze the problem statement**:

   - Does it involve finding pairs or triplets? → Two pointers
   - Does it involve subarrays or substrings? → Sliding window
   - Does it involve ranges or cumulative sums? → Prefix sum
   - Are numbers in a specific range? → Cyclic sort
   - Does it involve reversing or rotating? → In-place reversal
   - Does it involve time intervals? → Merge intervals

2. **Look at constraints**:

   - O(n) time and O(1) space often suggests two pointers or cyclic sort
   - O(n) time and O(n) space might allow hash maps or prefix sums

3. **Consider the data**:
   - Sorted arrays often benefit from two pointers
   - Unsorted arrays might need sorting first
   - Arrays with numbers in a range suggest cyclic sort

By practicing these patterns and understanding when to apply them, you'll develop intuition for solving array problems efficiently.
