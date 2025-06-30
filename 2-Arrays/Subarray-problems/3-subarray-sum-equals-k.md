# LC-560 Subarrays Sum Equals K

This problem requires us to find the number of contiguous subarrays that sum up to a given target value k.

## Approach 1: Brute Force (Nested Loops)

```javascript
/**
 * Counts the number of subarrays with sum equal to k using brute force approach.
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
function subarraySumBruteForce(nums, k) {
  let count = 0;
  const n = nums.length;

  // Iterate through all possible starting points of subarrays
  for (let start = 0; start < n; start++) {
    let currentSum = 0;

    // Iterate through all possible ending points from the current start
    for (let end = start; end < n; end++) {
      currentSum += nums[end];

      // If the current sum matches k, increment count
      if (currentSum === k) {
        count++;
      }
    }
  }

  return count;
}
```

## Approach 2: Prefix Sum with Hash Map (Optimal)

```javascript
/**
 * Counts the number of subarrays with sum equal to k using prefix sum and hash map.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function subarraySumOptimal(nums, k) {
  let count = 0;
  let currentSum = 0;
  const prefixSumCount = new Map();
  prefixSumCount.set(0, 1); // Base case: // Initialize with sum 0 having count 1

  for (const num of nums) {
    currentSum += num;

    // If (currentSum - k) exists in map, it means there are subarrays ending here that sum to k
    if (prefixSumCount.has(currentSum - k)) {
      count += prefixSumCount.get(currentSum - k);
    }

    // Update the count of current sum in the map
    prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);
  }

  return count;
}
```

## Dry Run of Optimal Approach

Let's test the optimal approach with 5 examples covering various cases:

### Example 1: Basic Case

**Input:** nums = [1, 1, 1], k = 2  
**Expected Output:** 2  
**Dry Run:**

```
Initialize: count = 0, currentSum = 0, map = {0:1}

Step 1: num = 1
currentSum = 1
1 - 2 = -1 → not in map
map = {0:1, 1:1}

Step 2: num = 1
currentSum = 2
count = 0
2 - 2 = 0 → in map (count += 1)
map = {0:1, 1:1, 2:1}
count = 1

Step 3: num = 1
currentSum = 3
count = 1
3 - 2 = 1 → in map (count += 1)
map = {0:1, 1:1, 2:1, 3:1} count = 2

Final count = 2
```

### Example 2: Negative Numbers

**Input:** nums = [1, -1, 0], k = 0  
**Expected Output:** 3  
**Dry Run:**

```
Initialize: count = 0, currentSum = 0, map = {0:1}

Step 1: num = 1
currentSum = 1
1 - 0 = 1 → not in map
map = {0:1, 1:1}

Step 2: num = -1
currentSum = 0
0 - 0 = 0 → in map (count += 1)
map = {0:2, 1:1}

Step 3: num = 0
currentSum = 0
0 - 0 = 0 → in map (count += 2)
map = {0:3, 1:1}

Final count = 3
```

### Example 3: Single Element Match

**Input:** nums = [5], k = 5  
**Expected Output:** 1  
**Dry Run:**

```
Initialize: count = 0, currentSum = 0, map = {0:1}

Step 1: num = 5
currentSum = 5
5 - 5 = 0 → in map (count += 1)
map = {0:1, 5:1}

Final count = 1
```

### Example 4: No Subarray Matches

**Input:** nums = [1, 2, 3], k = 7  
**Expected Output:** 0  
**Dry Run:**

```
Initialize: count = 0, currentSum = 0, map = {0:1}

Step 1: num = 1
currentSum = 1
1 - 7 = -6 → not in map
map = {0:1, 1:1}

Step 2: num = 2
currentSum = 3
3 - 7 = -4 → not in map
map = {0:1, 1:1, 3:1}

Step 3: num = 3
currentSum = 6
6 - 7 = -1 → not in map
map = {0:1, 1:1, 3:1, 6:1}

Final count = 0
```

### Example 5: Multiple Overlapping Subarrays

**Input:** nums = [3, 4, 7, 2, -3, 1, 4, 2], k = 7  
**Expected Output:** 4  
**Dry Run:**

```
Initialize: count = 0, currentSum = 0, map = {0:1}

Step 1: num = 3
currentSum = 3
3-7=-4 → not in map
map = {0:1, 3:1}

Step 2: num = 4
currentSum = 7
7-7=0 → in map (count += 1)
map = {0:1, 3:1, 7:1}

Step 3: num = 7
currentSum = 14
14-7=7 → in map (count += 1)
map = {0:1, 3:1, 7:1, 14:1}

Step 4: num = 2
currentSum = 16
16-7=9 → not in map
map = {0:1, 3:1, 7:1, 14:1, 16:1}

Step 5: num = -3
currentSum = 13
13-7=6 → not in map
map = {0:1, 3:1, 7:1, 14:1, 16:1, 13:1}

Step 6: num = 1
currentSum = 14
14-7=7 → in map (count += 1)
map = {0:1, 3:1, 7:1, 14:2, 16:1, 13:1}

Step 7: num = 4
currentSum = 18
18-7=11 → not in map
map = {0:1, 3:1, 7:1, 14:2, 16:1, 13:1, 18:1}

Step 8: num = 2
currentSum = 20
20-7=13 → in map (count += 1)
map = {0:1, 3:1, 7:1, 14:2, 16:1, 13:1, 18:1, 20:1}

Final count = 4
```

## Approach 3: Prefix Sum without Hash (Sliding Window Concept - Only for Positive Numbers)

```javascript
/**
 * Counts the number of subarrays with sum equal to k using sliding window (only works for positive numbers).
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function subarraySumSlidingWindow(nums, k) {
  let count = 0;
  let windowSum = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    windowSum += nums[right];

    // Shrink the window from the left if sum exceeds k
    while (windowSum > k && left <= right) {
      windowSum -= nums[left];
      left++;
    }

    // If we found a subarray with sum k
    if (windowSum === k) {
      count++;
    }
  }

  return count;
}
```

Note: The sliding window approach only works when all numbers are positive. For arrays with negative numbers, we must use the prefix sum with hash map approach.

The optimal approach (Approach 2) works for all cases including negative numbers and zeros, with O(n) time and space complexity.
