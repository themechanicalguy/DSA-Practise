# Check if there exists a subsequence with sum K

Given an array arr and target sum k, check whether there exists a subsequence such that the sum of all elements in the subsequence equals the given target sum(k).

https://www.geeksforgeeks.org/problems/check-if-there-exists-a-subsequence-with-sum-k/1

### **Key Observations:**

1. **Subsequence vs. Subset:** A subsequence maintains the original order of elements, but unlike a subset, the order matters in terms of sequence but not in terms of combination sum. However, for the sum, the order doesn't matter, so we can treat it similarly to a subset sum problem.

### Intuition

- This is a decision problem: we need to answer "yes" or "true" if such a subsequence exists, and "false" otherwise.
- At each element in the array, we have two choices:
  - Include the current element in the subsequence and add its value to the running sum.
  - Exclude the current element and keep the running sum unchanged.
- We can solve this recursively by exploring all possible subsequences, keeping track of the current sum and the index in the array.
- The recursion stops when we either:
  - Reach the target sum (currSum==kcurrSum == kcurrSum == k), indicating a valid subsequence.
  - Exhaust all elements (reach the end of the array), in which case we check if the current sum equals ( k ).
- To optimize, we can stop exploring a path if the current sum exceeds ( k ) (if all elements are positive), but since the problem doesn’t guarantee positive numbers, we’ll consider all possibilities.

### Approach:

- Use a recursive function that takes the array, target sum, current index, and current sum as parameters.

Base cases:

- If the current sum equals the target sum, return true.
- If we’ve processed all elements (index reaches array length), return true only if the current sum equals the target sum.

Recursive cases:

- Include the current element: add its value to the current sum and recurse to the next index.
- Exclude the current element: keep the current sum unchanged and recurse to the next index.

- Return true if either choice leads to a valid subsequence, false otherwise.

**Optimization:**

- **Early Termination:** If at any point the target sum becomes negative, we can terminate that branch of recursion early since adding more elements will only decrease the sum further.
- **Memoization:** To avoid recalculating the same states, we can memoize the results of subproblems (though this is more relevant for the dynamic programming approach).

### Recursive Solution in JavaScript:

```javascript
// Function to check if a subsequence with sum equal to targetSum exists
function hasSubsequenceWithSum(arr, targetSum) {
  // Helper function to perform recursive checks
  function checkSubsequence(index, currSum) {
    // Base case: if current sum equals target sum, a valid subsequence is found
    if (currSum === targetSum) {
      return true;
    }
    // Base case: if we've processed all elements, check if sum matches target
    if (index >= arr.length) {
      return currSum === targetSum;
    }

    // Recursive case 1: Include current element
    const includeCurrent = checkSubsequence(index + 1, currSum + arr[index]);
    // Recursive case 2: Exclude current element
    const excludeCurrent = checkSubsequence(index + 1, currSum);

    // Return true if either including or excluding leads to a valid subsequence
    return includeCurrent || excludeCurrent;
  }

  // Start recursion from index 0 with sum 0
  return checkSubsequence(0, 0);
}

// Test cases
console.log(hasSubsequenceWithSum([10, 1, 2, 7, 6, 1, 5], 8)); // Output: true
console.log(hasSubsequenceWithSum([2, 3, 5, 7, 9], 100)); // Output: false
console.log(hasSubsequenceWithSum([1, -1, 2, -2], 0)); // Output: true
console.log(hasSubsequenceWithSum([], 0)); // Output: true
```

```javascript
///Print all subsequence with sum = k
function checkSubsequenceSum(arr, k) {
  // Code here
  let res = [];
  let oput = [];

  const backtrack = (arr, index, oput, res) => {
    //base case
    if (index >= arr.length) {
      res.push([...oput]);
      return;
    }

    //exclude
    backtrack(arr, index + 1, [...oput], res);

    oput.push(arr[index]);
    backtrack(arr, index + 1, [...oput], res);
  };

  backtrack(arr, 0, oput, res);

  const sum = [];

  res.forEach((item) => {
    let tempSum = item.reduce((acc, i) => acc + i, 0);
    if (tempSum === k) {
      sum.push(item);
    }
  });

  return sum;
}

let arr = [2, 3, 5, 7, 9],
  k = 100;
checkSubsequenceSum(arr, k);
```

### Time and Space Complexity Analysis:

- **Time Complexity:** O(2^n), where `n` is the length of the array. This is because, in the worst case, we explore all possible subsequences (each element can be either included or excluded).
- **Space Complexity:** O(n), due to the recursion stack depth, which can go up to `n` levels deep (one for each element in the array).

### Dry Run with Examples:

**Example 1: arr = [10, 1, 2, 7, 6, 1, 5], k = 8**

- Start at index 0, remainingSum = 8.
- Exclude 10: proceed to index 1, sum = 8.
- Include 1: proceed to index 2, sum = 7.
- Include 2: proceed to index 3, sum = 5.
- Include 7: sum becomes -2 → return false (backtrack).
- Exclude 7: proceed to index 4, sum = 5.
- Include 6: sum becomes -1 → return false (backtrack).
- Exclude 6: proceed to index 5, sum = 5.
- Include 1: proceed to index 6, sum = 4.
- Include 5: sum becomes -1 → return false (backtrack).
- Exclude 5: proceed to index 7 (out of bounds), sum = 4 → return false (backtrack).
- Exclude 1: proceed to index 6, sum = 5.
- Include 5: sum = 0 → return true.
- Output: true (subsequence [1, 2, 5] sums to 8).

**Example 2: arr = [2, 3, 5, 7, 9], k = 100**

- All possible subsequences are explored, but none sum to 100.
- Output: false.

**Example 3: arr = [], k = 0**

- Empty array, but the empty subsequence sums to 0.
- Output: true.

### Edge Cases Covered:

1. **Empty Array:**
   - `arr = [], k = 0` → true (empty subsequence).
   - `arr = [], k = 1` → false.
2. **Single Element:**
   - `arr = [5], k = 5` → true.
   - `arr = [5], k = 6` → false.
3. **Negative Numbers:**
   - If the array had negative numbers, the early termination condition (`remainingSum < 0`) might not work, but the problem statement doesn't mention negatives.
4. **Large Target:**
   - `arr = [1, 2, 3], k = 100` → false.

This approach efficiently explores all possible subsequences using recursion and handles all edge cases correctly.
