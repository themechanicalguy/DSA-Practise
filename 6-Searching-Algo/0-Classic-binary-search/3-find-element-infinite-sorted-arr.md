# Finding Position in an Infinite Sorted Array OR Exponential Search

-- Asked in Amazon, Google , Ola

## Problem Understanding

We need to find the position of a given element in an "infinite" sorted array. In reality, since we can't have truly infinite arrays in programming, this means we need to find the element without knowing the array bounds beforehand.

### 2. Exponential Search (Optimal)

**Intuition:** For an infinite array, we first find a range where the target might exist by exponentially increasing the high index `(e.g., 1, 2, 4, 8, …) `until we find an element greater than or equal to the target or undefined.
Then, apply binary search within that range.

This is the best approach for unbounded/infinite arrays:

1. Start with a small range (like index 0-1)
2. Keep doubling the range until we find a range that contains the target
3. Then perform binary search within that range

```javascript
function findElementInfinite(arr, target) {
  // Step 1: Find the range where target might exist
  let low = 0;
  let high = 1;

  // Exponentially increase high until arr[high] >= target or undefined
  while (arr[high] !== undefined && arr[high] < target) {
    low = high + 1; // Move low to next range
    high *= 2; // Double the high index
  }

  // Step 2: Perform binary search in the range [low, high]
  while (low <= high && arr[low] !== undefined && arr[high] !== undefined) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      return mid; // Target found
    } else if (arr[mid] < target) {
      low = mid + 1; // Search right half
    } else {
      high = mid - 1; // Search left half
    }
  }

  return -1; // Target not found
}
```

## Complexity Analysis

### Exponential Search + Binary Search

- **Time Complexity**: O(log n)
  - Finding the range takes O(log n) (exponential steps)
  - Binary search in the range takes O(log n)
- **Space Complexity**: O(1)
  - Uses constant extra space

### Linear Search

- **Time Complexity**: O(n)
  - In worst case, we might need to check all elements
- **Space Complexity**: O(1)
  - Uses constant extra space

## Dry Run Examples

### Example 1 (From Problem Statement)

```
Input: N = 89, array[] = [9, 11, 17, 26, 37, 52, 89, 111, 129, 144, 198]

Steps:
1. Start with low=0, high=1 (values 9,11)
   89 > 11 → double high
2. low=1, high=2 (values 11,17)
   89 > 17 → double high
3. low=2, high=4 (values 17,37)
   89 > 37 → double high
4. low=4, high=8 (values 37,129)
   89 <= 129 → now binary search between 4-8

Binary Search:
- mid=6 (value 89) → found!
Output: 6
```

### Example 2 (From Problem Statement)

```
Input: N = 20, array[] = [2, 4, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26]

Steps:
1. Start with low=0, high=1 (values 2,4)
   20 > 4 → double high
2. low=1, high=2 (values 4,8)
   20 > 8 → double high
3. low=2, high=4 (values 8,12)
   20 > 12 → double high
4. low=4, high=8 (values 12,20)
   20 <= 20 → now binary search between 4-8

Binary Search:
- mid=6 (value 16) → 20 > 16 → search right
- mid=7 (value 18) → 20 > 18 → search right
- mid=8 (value 20) → found!
Output: 8
```

### Example 3 (Edge Case - Element Not Present)

```
Input: N = 15, array[] = [2, 4, 8, 10, 12, 14, 16, 18, 20, 22]

Steps:
1. Start with low=0, high=1 (values 2,4)
   15 > 4 → double high
2. low=1, high=2 (values 4,8)
   15 > 8 → double high
3. low=2, high=4 (values 8,12)
   15 > 12 → double high
4. low=4, high=8 (values 12,18)
   15 <= 18 → now binary search between 4-8

Binary Search:
- mid=6 (value 16) → 15 < 16 → search left
- mid=5 (value 14) → 15 > 14 → search right
- low=6, high=5 → exit loop
Output: -1 (not found)
```

The exponential search approach is optimal for this problem as it efficiently handles the unbounded nature of the array while maintaining logarithmic time complexity.
