# LC-532 - K-diff pairs

### **Problem Understanding**

We need to find the number of unique k-diff pairs in an array.
A k-diff pair is defined as a pair of integers `(nums[i], nums[j])` such that:

1. `i != j` (indices are different).
2. The absolute difference `|nums[i] - nums[j]| == k`.
3. The pairs should be unique (e.g., `(1, 3)` and `(3, 1)` are considered the same).

### **Key Observations**

1. **Uniqueness**: We need to ensure that we count each unique pair only once, regardless of the order.
2. **k = 0**: When `k = 0`, we are looking for pairs where `nums[i] == nums[j]`. This means we need to count duplicate numbers in the array.
3. **k > 0**: For `k > 0`, we need to find pairs where one number is `k` greater than the other.

### **Approaches**

#### **1. Brute Force (Nested Loops)**

- **Intuition**: Check all possible pairs in the array and count those that satisfy the conditions.
- **Approach**:
  - Use two nested loops to generate all possible pairs `(i, j)` where `i != j`.
  - For each pair, check if `|nums[i] - nums[j]| == k`.
  - Use a set to store unique pairs to avoid duplicates.

```javascript
/**
 * Brute force approach to find unique k-diff pairs.
 * Time: O(n²), Space: O(n)
 */
function findPairsBruteForce(nums, k) {
  const uniquePairs = new Set();
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(nums[i] - nums[j]) === k) {
        // Store the pair in a sorted manner to avoid duplicates
        const pair = [Math.min(nums[i], nums[j]), Math.max(nums[i], nums[j])];
        uniquePairs.add(pair.toString());
      }
    }
  }

  return uniquePairs.size;
}
```

- **Time Complexity**: O(n²) due to nested loops.
- **Space Complexity**: O(n) for storing unique pairs.

#### **2. Hash Map (Frequency Count)**

- **Intuition**: Use a hash map to store the frequency of each number. Then, for each number, check if `num + k` exists in the map.
- **Approach**:
  - If `k == 0`, count how many numbers appear at least twice.
  - If `k > 0`, for each number `num`, check if `num + k` exists in the map.
  - Use a set to avoid duplicate pairs.

```javascript
/**
 * Optimal approach using a hash map.
 * Time: O(n), Space: O(n)
 */
function findPairsHashMap(nums, k) {
  if (k < 0) return 0; // Absolute difference cannot be negative

  const frequencyMap = {};
  const uniquePairs = new Set();

  // Build frequency map
  for (const num of nums) {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
  }

  // Find pairs
  for (const num of nums) {
    if (k === 0) {
      if (frequencyMap[num] >= 2) {
        uniquePairs.add(num.toString());
      }
    } else {
      if (frequencyMap[num + k]) {
        uniquePairs.add(`${num},${num + k}`);
      }
    }
  }

  return uniquePairs.size;
}
```

- **Time Complexity**: O(n) for traversing the array.
- **Space Complexity**: O(n) for the hash map and set.

#### **3. Sorting and Two Pointers**

- **Intuition**: Sort the array and use two pointers to find pairs with the required difference.
- **Approach**:
  - Sort the array.
  - Use two pointers, `left` and `right`, to find pairs where `nums[right] - nums[left] == k`.
  - Skip duplicates to ensure uniqueness.

```javascript
/**
 * Sorting and two pointers approach.
 * Time: O(n log n), Space: O(1)
 */
function findPairsTwoPointers(nums, k) {
  nums.sort((a, b) => a - b);
  let left = 0;
  let right = 1;
  let count = 0;

  while (left < nums.length && right < nums.length) {
    if (left === right) {
      right++; // Avoid comparing the same element
      continue;
    }

    const diff = nums[right] - nums[left];

    if (diff === k) {
      count++;
      left++;
      right++;
      // Skip duplicates
      while (left < nums.length && nums[left] === nums[left - 1]) left++;
      while (right < nums.length && nums[right] === nums[right - 1]) right++;
    } else if (diff < k) {
      right++;
    } else {
      left++;
    }
  }

  return count;
}
```

- **Time Complexity**: O(n log n) due to sorting.
- **Space Complexity**: O(1) (if sorting is done in-place).

---

### **Dry Run of Optimal Approach (Hash Map)**

#### **Example 1: nums = [3,1,4,1,5], k = 2**

1. **Frequency Map**: `{ 1: 2, 3: 1, 4: 1, 5: 1 }`
2. **Check Pairs**:
   - For `3`: `3 + 2 = 5` exists → Add `(3,5)`.
   - For `1`: `1 + 2 = 3` exists → Add `(1,3)`.
   - For `4`: `4 + 2 = 6` does not exist.
   - For `1`: Already processed.
   - For `5`: `5 + 2 = 7` does not exist.
3. **Unique Pairs**: `(1,3), (3,5)` → **Output: 2**.

#### **Example 2: nums = [1,2,3,4,5], k = 1**

1. **Frequency Map**: `{ 1:1, 2:1, 3:1, 4:1, 5:1 }`
2. **Check Pairs**:
   - For `1`: `1 + 1 = 2` exists → Add `(1,2)`.
   - For `2`: `2 + 1 = 3` exists → Add `(2,3)`.
   - For `3`: `3 + 1 = 4` exists → Add `(3,4)`.
   - For `4`: `4 + 1 = 5` exists → Add `(4,5)`.
   - For `5`: `5 + 1 = 6` does not exist.
3. **Unique Pairs**: `(1,2), (2,3), (3,4), (4,5)` → **Output: 4**.

#### **Example 3: nums = [1,3,1,5,4], k = 0**

1. **Frequency Map**: `{ 1:2, 3:1, 4:1, 5:1 }`
2. **Check Pairs** (since `k = 0`):
   - For `1`: Appears twice → Add `(1,1)`.
   - For `3`: Appears once → Skip.
   - For `1`: Already processed.
   - For `5`: Appears once → Skip.
   - For `4`: Appears once → Skip.
3. **Unique Pairs**: `(1,1)` → **Output: 1**.

---

### **Final Thoughts**

- The **hash map approach** is optimal for most cases with `O(n)` time and space.
- The **two-pointer approach** is efficient if the array is sorted or can be sorted (`O(n log n)` time).
- The **brute force approach** is straightforward but inefficient for large arrays.

**Recommendation**: Use the **hash map approach** for its linear time complexity.
