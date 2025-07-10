# LC 977. Squares of a Sorted Array

## Problem Understanding

We need to square each element in a sorted (non-decreasing) array and return a new array with these squares also sorted in non-decreasing order.

## Approaches

### 1. Brute Force Approach (Square and Sort)

**Intuition**: The simplest approach is to square all elements first and then sort the resulting array.

**Approach**:

1. Square each element in the array
2. Sort the squared values

**Time Complexity**: O(n log n) due to sorting
**Space Complexity**: O(n) for the output array (or O(1) if we modify input in place, but that's generally not recommended)

```javascript
function sortedSquaresBruteForce(nums) {
  // Square each number
  const squared = nums.map((num) => num * num);

  // Sort the squared values
  squared.sort((a, b) => a - b);

  return squared;
}
```

### 2. Two Pointer Approach (Optimal O(n) solution)

**Intuition**: Since the input array is sorted, we can take advantage of this. The challenge is that negative numbers, when squared, could become larger than some positive numbers.

The largest squared values will be at either end of the array (because of negative numbers on the left). So we can use two pointers to compare the extremes and build our result from the end.

**Approach**:

1. Initialize two pointers at start and end of array
2. Compare absolute values of elements at both pointers
3. Place the larger square at the current end of result array
4. Move the pointer inward from whichever side had the larger element
5. Repeat until all elements are processed

**Time Complexity**: O(n) - we process each element exactly once
**Space Complexity**: O(n) - for the output array

```javascript
function sortedSquaresOptimal(nums) {
  const n = nums.length;
  const result = new Array(n);
  let left = 0;
  let right = n - 1;
  let resultIndex = n - 1; // Start filling from the end

  while (left <= right) {
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];

    // Compare absolute values via their squares
    if (leftSquare > rightSquare) {
      result[resultIndex] = leftSquare;
      left++; // Move left pointer right
    } else {
      result[resultIndex] = rightSquare;
      right--; // Move right pointer left
    }
    resultIndex--; // Move to next position in result
  }

  return result;
}
```

## Dry Run of Optimal Approach

### Example 1: Mixed positive and negative numbers

Input: [-4, -1, 0, 3, 10]

Step-by-step:

1. left=0 (-4), right=4 (10)
   - leftSquare=16, rightSquare=100
   - 100 > 16 → result[4]=100, right=3, resultIndex=3
2. left=0 (-4), right=3 (3)
   - leftSquare=16, rightSquare=9
   - 16 > 9 → result[3]=16, left=1, resultIndex=2
3. left=1 (-1), right=3 (3)
   - leftSquare=1, rightSquare=9
   - 9 > 1 → result[2]=9, right=2, resultIndex=1
4. left=1 (-1), right=2 (0)
   - leftSquare=1, rightSquare=0
   - 1 > 0 → result[1]=1, left=2, resultIndex=0
5. left=2 (0), right=2 (0)
   - leftSquare=0, rightSquare=0
   - 0 == 0 → result[0]=0, right=1, resultIndex=-1

Result: [0, 1, 9, 16, 100]

### Example 2: All negative numbers

Input: [-5, -3, -2, -1]

Step-by-step:

1. left=0 (-5), right=3 (-1)
   - leftSquare=25, rightSquare=1
   - 25 > 1 → result[3]=25, left=1, resultIndex=2
2. left=1 (-3), right=3 (-1)
   - leftSquare=9, rightSquare=1
   - 9 > 1 → result[2]=9, left=2, resultIndex=1
3. left=2 (-2), right=3 (-1)
   - leftSquare=4, rightSquare=1
   - 4 > 1 → result[1]=4, left=3, resultIndex=0
4. left=3 (-1), right=3 (-1)
   - leftSquare=1, rightSquare=1
   - 1 == 1 → result[0]=1, right=2, resultIndex=-1

Result: [1, 4, 9, 25]

### Example 3: All positive numbers

Input: [1, 2, 3, 4]

Step-by-step:

1. left=0 (1), right=3 (4)
   - leftSquare=1, rightSquare=16
   - 16 > 1 → result[3]=16, right=2, resultIndex=2
2. left=0 (1), right=2 (3)
   - leftSquare=1, rightSquare=9
   - 9 > 1 → result[2]=9, right=1, resultIndex=1
3. left=0 (1), right=1 (2)
   - leftSquare=1, rightSquare=4
   - 4 > 1 → result[1]=4, right=0, resultIndex=0
4. left=0 (1), right=0 (1)
   - leftSquare=1, rightSquare=1
   - 1 == 1 → result[0]=1, right=-1, resultIndex=-1

Result: [1, 4, 9, 16]

## Edge Cases

- All negative numbers
- All positive numbers
- Contains zero
- Single element array
- Empty array (though problem says "integer array" so probably not empty)

The optimal two-pointer approach handles all these cases efficiently in O(n) time.
