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

## Dry Runs with Various Cases

### Case 1: Standard Case [2,0,2,1,1,0]

```
Initial: [2,0,2,1,1,0], low=0, high=5, current=0
Step 1: nums[0]=2 → swap with high → [0,0,2,1,1,2], high=4
Step 2: nums[0]=0 → swap with low → [0,0,2,1,1,2], low=1, current=1
Step 3: nums[1]=0 → swap with low → [0,0,2,1,1,2], low=2, current=2
Step 4: nums[2]=2 → swap with high → [0,0,1,1,2,2], high=3
Step 5: nums[2]=1 → current=3
Step 6: nums[3]=1 → current=4
Done: [0,0,1,1,2,2]
```

### Case 2: All 1s [1,1,1,1]

```
Initial: [1,1,1,1], low=0, high=3, current=0
Step 1: nums[0]=1 → current=1
Step 2: nums[1]=1 → current=2
Step 3: nums[2]=1 → current=3
Step 4: nums[3]=1 → current=4
Done: [1,1,1,1] (no changes needed)
```

### Case 3: Already Sorted [0,0,1,1,2,2]

```
Initial: [0,0,1,1,2,2], low=0, high=5, current=0
Step 1: nums[0]=0 → swap with low → [0,0,1,1,2,2], low=1, current=1
Step 2: nums[1]=0 → swap with low → [0,0,1,1,2,2], low=2, current=2
Step 3: nums[2]=1 → current=3
Step 4: nums[3]=1 → current=4
Step 5: nums[4]=2 → swap with high → [0,0,1,1,2,2], high=4
Done: [0,0,1,1,2,2] (no changes)
```

### Case 4: Reverse Sorted [2,2,1,1,0,0]

```
Initial: [2,2,1,1,0,0], low=0, high=5, current=0
Step 1: nums[0]=2 → swap with high → [0,2,1,1,0,2], high=4
Step 2: nums[0]=0 → swap with low → [0,2,1,1,0,2], low=1, current=1
Step 3: nums[1]=2 → swap with high → [0,0,1,1,2,2], high=3
Step 4: nums[1]=0 → swap with low → [0,0,1,1,2,2], low=2, current=2
Step 5: nums[2]=1 → current=3
Step 6: nums[3]=1 → current=4
Done: [0,0,1,1,2,2]
```

### Case 5: Single Element [1]

```
Initial: [1], low=0, high=0, current=0
Step 1: nums[0]=1 → current=1
Done: [1]
```

### Case 6: Empty Array []

```
Initial: [], low=0, high=-1, current=0
Done: [] (loop doesn't execute)
```

## Edge Cases Covered

1. **Standard mixed case** (Case 1)
2. **All elements same** (Case 2)
3. **Already sorted** (Case 3)
4. **Reverse sorted** (Case 4)
5. **Single element** (Case 5)
6. **Empty array** (Case 6)

## Time and Space Complexity

- **Time Complexity**: O(n) - Each element is looked at exactly once
- **Space Complexity**: O(1) - Only three pointers are used regardless of input size

# Understanding Pointer Movement in the Dutch National Flag Algorithm

The algorithm uses three pointers to partition an array of 0s, 1s, and 2s into three regions:

- **0s region:** Elements from index `0` to `low - 1` are all 0s.
- **1s region:** Elements from index `low` to `mid - 1` are all 1s.
- **Unsorted region:** Elements from index `mid` to `high` are yet to be processed.
- **2s region:** Elements from index `high + 1` to the end are all 2s.

The `mid` pointer is the "current" pointer that scans through the unsorted region, deciding where each element belongs.
The algorithm processes elements in the unsorted region until `mid` exceeds `high`, at which point the array is fully sorted.

## Why `mid` is Incremented for 0s but Not for 2s

### When we find a 0 (nums[mid] === 0):

1. **Swap with `low` pointer**:

   - Moves the 0 to its correct position at the beginning
   - The element swapped from `low` to `mid` could be either 1 or 0 (but never 2, because 2s are at the end)

2. **Increment both `low` and `mid`**:
   - We increment `low` because we've added a new 0 to the 0s section
   - We increment `mid` because:
     - If we swapped with a 0: The new element at `mid` is already processed
     - If we swapped with a 1: It's in the correct middle section
     - In both cases, we can safely move forward

### When we find a 2 (nums[mid] === 2):

1. **Swap with `high` pointer**:

   - Moves the 2 to its correct position at the end
   - The element swapped from `high` to `mid` could be 0, 1, or 2 (we don't know yet)

2. **Only decrement `high`**:
   - We don't increment `mid` because:
     - The new element at `mid` came from the unknown region (`high`)
     - We need to re-examine this new element in the next iteration
     - It might be a 0 that needs to be moved to the beginning

## Visual Example

Consider the array: `[2, 0, 1, 2, 0]`

Initial state:

```
[2, 0, 1, 2, 0]
 ^        ^
low=0    high=4
mid=0
```

1. nums[0] = 2 → swap with high (4):

   - Swap 2 and 0 → `[0, 0, 1, 2, 2]`
   - high-- (now 3)
   - **mid stays at 0** because we need to process the new 0

2. nums[0] = 0 → swap with low (0):

   - Swap 0 and 0 → no change
   - low++ (now 1), mid++ (now 1)

3. nums[1] = 0 → swap with low (1):

   - Swap 0 and 0 → no change
   - low++ (now 2), mid++ (now 2)

4. nums[2] = 1 → just increment mid to 3

5. nums[3] = 2 → swap with high (3):
   - Swap 2 and 2 → no change
   - high-- (now 2)
   - Loop ends (mid > high)

Final sorted array: `[0, 0, 1, 2, 2]`

## Key Insights

1. **After swapping with `low`**:

   - We know the element coming from `low` is either 0 or 1 (never 2)
   - Therefore safe to move `mid` forward

2. **After swapping with `high`**:

   - The element coming from `high` could be anything
   - We must re-examine it before moving forward

3. **Algorithm Invariants**:
   - Elements before `low` are all 0s
   - Elements between `low` and `mid` are all 1s
   - Elements after `high` are all 2s
   - Elements between `mid` and `high` are unknown

This careful pointer movement ensures the algorithm maintains its invariants while sorting the array in a single pass with constant space.
