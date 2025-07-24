# 53. Maximum Subarray - July 19

## How Kadane's Algorithm Works

Kadane's Algorithm is an efficient solution for finding the maximum sum of a contiguous subarray within a one-dimensional array of numbers.
It's a dynamic programming approach that solves the problem in O(n) time with O(1) space complexity.

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

# Boyer-Moore Voting Algorithm Explained

The Boyer-Moore Voting Algorithm is an efficient algorithm to find the majority element in a sequence, where the majority element is defined as an element that appears more than `⌊n/2⌋` times (where `n` is the size of the sequence).

## How the Algorithm Works

The algorithm works on the principle that if you cancel out each occurrence of the majority element with all the other elements, the majority element will still remain at the end.

The intuition is based on a `voting` or `pairing` concept:

- Imagine each element in the array as a vote. The majority element has more votes than all other elements combined, because it appears more than `⌊n/2⌋` times.
- The algorithm maintains a single candidate and a count of “votes” for that candidate.
- As we traverse the array:
  - If we see the `current` candidate, we `increment` the vote `count` (reinforcing the candidate).
  - If we see a different element, we `decrement` the vote `count` (as if the non-candidate cancels out a vote for the candidate).
  - If the `count` reaches `zero`, we pick a new candidate from the current element and reset the `count` to `1`.
- At the end, the `candidate` is the majority element because the majority element’s frequency ensures it “survives” the cancellation process.

## Why It Works

The algorithm essentially pairs each majority element with a non-majority element and cancels them out. Since there are more majority elements than all other elements combined, at least one majority element will remain uncanceled.

- Since the majority element appears more than `⌊n/2⌋` times, it has more occurrences than all other elements combined.
- When we pair a majority element with a non-majority element (by decrementing the count), the majority element’s occurrences will still remain after all non-majority elements are “canceled out.”
- Even if we temporarily switch candidates when the count reaches zero, the majority element’s dominance ensures it will eventually become the candidate again and maintain a positive count by the end.

## Key Properties

- **Single Pass:** The algorithm requires only one traversal of the array, making it `O(n)` in time complexity.
- **Constant Space:** It uses only two variables (candidate and count), achieving `O(1)` space complexity.
- **Guarantee-Based:** The problem guarantees a majority element exists, so we don’t need a second pass to verify the candidate (though in variations where no majority is guaranteed, a verification step would be needed).

### Algorithm Steps:

1. **Initialize**:

   - `candidate`: Stores the current potential majority element
   - `count`: Tracks the net advantage of the candidate over other elements

2. **Iterate through the array**:

   - If `count` is 0, we choose the current element as the new `candidate`
   - If the current element is the same as `candidate`, increment `count`
   - Otherwise, decrement `count`

3. **Final result**:
   - The `candidate` at the end is guaranteed to be the majority element (given that a majority exists)

## JavaScript Implementation

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

# Dutch National Flag Algorithm - Detailed Explanation

## What is the Dutch National Flag Algorithm?

The Dutch National Flag Algorithm is a programming problem proposed by Edsger Dijkstra where we need to sort an array containing three distinct values (traditionally represented by the colors of the Dutch flag: red, white, and blue).
The algorithm partitions the array into three sections in a single pass with constant space complexity.

## Key Characteristics

1. **Three-way partitioning**: Divides the array into three sections:

   - Elements less than the pivot (0s)
   - Elements equal to the pivot (1s)
   - Elements greater than the pivot (2s)

2. **In-place sorting**: Doesn't require additional memory space

3. **Single pass**: Processes the array in O(n) time

## Algorithm Steps

1. Initialize three pointers:

   - `low` - tracks the boundary of 0s (starts at beginning)
   - `high` - tracks the boundary of 2s (starts at end)
   - `current` - the current element being processed (starts at beginning)

2. While `current` <= `high`:
   - If element is 0: swap with `low` pointer, increment both `low` and `current`
   - If element is 1: just increment `current`
   - If element is 2: swap with `high` pointer, decrement `high`

## JavaScript Implementation

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
