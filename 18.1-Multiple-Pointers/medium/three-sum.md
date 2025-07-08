# Three Sum Problem Solution

## Problem Understanding

We need to find all unique triplets in an array that sum to zero, with no duplicate triplets in the result.

## Approaches

### 1. Brute Force Approach

#### Intuition

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

// Time Complexity: O(n³) - Still triple nested loop
// Space Complexity: O(n³) - In worst case, could store all possible triplets in the Set
```

### 2. Two Pointer Approach (Optimal)

#### Intuition

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
        // Skip duplicates for left pointer
        while (left < right && nums[left] === nums[left + 1]) left++;
        // Skip duplicates for right pointer
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

// Time Complexity: O(n²) - Outer loop O(n), inner while loop O(n)
// Space Complexity: O(1) - No additional space used (result storage not counted)
```

## Dry Run of Optimal Approach

### Example 1: Basic Case

Input: nums = [-1,0,1,2,-1,-4]
Sorted: [-4, -1, -1, 0, 1, 2]

1. i=0, nums[i]=-4, left=1, right=5
   - sum = -4 + -1 + 2 = -3 < 0 → left++
2. i=0, left=2, right=5
   - sum = -4 + -1 + 2 = -3 < 0 → left++
3. i=0, left=3, right=5
   - sum = -4 + 0 + 2 = -2 < 0 → left++
4. i=0, left=4, right=5

   - sum = -4 + 1 + 2 = -1 < 0 → left++ (loop ends)

5. i=1, nums[i]=-1, left=2, right=5
   - sum = -1 + -1 + 2 = 0 → add [-1,-1,2]
   - skip duplicates (none), left=3, right=4
6. i=1, left=3, right=4

   - sum = -1 + 0 + 1 = 0 → add [-1,0,1]
   - skip duplicates (none), left=4, right=3 (loop ends)

7. i=2, nums[i]=-1 (same as previous, skip)

8. i=3, nums[i]=0, left=4, right=5
   - sum = 0 + 1 + 2 = 3 > 0 → right--
   - left=4, right=4 (loop ends)

Final result: [[-1,-1,2], [-1,0,1]]

### Example 2: All Zeros

Input: [0,0,0,0]
Sorted: [0,0,0,0]

1. i=0, nums[i]=0, left=1, right=3
   - sum = 0+0+0 = 0 → add [0,0,0]
   - skip duplicates: left moves to 3 (from 1), right moves to 0 (from 3)
   - loop ends
2. i=1, nums[i]=0 (same as previous, skip)

Final result: [[0,0,0]]

### Example 3: No Valid Triplets

Input: [1,2,-2,-1]
Sorted: [-2, -1, 1, 2]

1. i=0, nums[i]=-2, left=1, right=3
   - sum = -2 + -1 + 2 = -1 < 0 → left++
2. i=0, left=2, right=3
   - sum = -2 + 1 + 2 = 1 > 0 → right--
   - left=2, right=2 (loop ends)
3. i=1, nums[i]=-1, left=2, right=3
   - sum = -1 + 1 + 2 = 2 > 0 → right--
   - left=2, right=2 (loop ends)

Final result: []

These examples cover:

- Basic case with multiple solutions
- Edge case with all identical elements
- Case with no valid solutions
