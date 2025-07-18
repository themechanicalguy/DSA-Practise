### Understanding Array Rotation via Reversals

- When rotating an array either to the left or to the right, the **reversal method** is an efficient in-place technique with `O(n)` time complexity and `O(1)` space complexity.
- The key idea is to strategically reverse portions of the array to achieve the desired rotation.

### Key Observations

1. **Effective Rotations**:

   - Rotating an array of length `n` by `n` steps results in the original array. Thus, the effective rotations are `k % n`.

2. **Left vs. Right Rotation**:
   - **Left Rotation**: Elements move to the left; the first `k` elements wrap around to the end.
   - **Right Rotation**: Elements move to the right; the last `k` elements wrap around to the beginning.

### Reversal Strategy Breakdown

#### Right Rotation (`rotateRight`)

1. **Reverse the Entire Array**:

   - This moves the last `k` elements to the front but in reverse order.
   - Example: `[1,2,3,4,5,6,7]` → `[7,6,5,4,3,2,1]` (for `k=3`).

2. **Reverse the First `k` Elements**:

   - Corrects the order of the first `k` elements.
   - Example: `[7,6,5,4,3,2,1]` → `[5,6,7,4,3,2,1]`.

3. **Reverse the Remaining `n - k` Elements**:
   - Corrects the order of the remaining elements.
   - Example: `[5,6,7,4,3,2,1]` → `[5,6,7,1,2,3,4]`.

#### Left Rotation (`rotateLeft`)

1. **Reverse the Entire Array**:

   - This moves the first `k` elements to the end but in reverse order.
   - Example: `[1,2,3,4,5,6,7]` → `[7,6,5,4,3,2,1]` (for `k=3`).

2. **Reverse the Last `k` Elements**:

   - Corrects the order of the last `k` elements.
   - Example: `[7,6,5,4,3,2,1]` → `[7,6,5,1,2,3,4]`.

3. **Reverse the First `n - k` Elements**:
   - Corrects the order of the remaining elements.
   - Example: `[7,6,5,1,2,3,4]` → `[4,5,6,7,1,2,3]`.

### Identifying Which Parts to Reverse

To determine which parts of the array to reverse for a given rotation direction:

1. **Right Rotation**:

   - **First Reverse**: Entire array (`0` to `n-1`).
   - **Second Reverse**: First `k` elements (`0` to `k-1`).
   - **Third Reverse**: Remaining elements (`k` to `n-1`).

2. **Left Rotation**:
   - **First Reverse**: Entire array (`0` to `n-1`).
   - **Second Reverse**: Last `k` elements (`n - k` to `n - 1`).
   - **Third Reverse**: First `n - k` elements (`0` to `n - k - 1`).

### General Rule

- **Right Rotation**:

  - Think of bringing the last `k` elements to the front.
  - Reverse the entire array to move them to the front (but reversed).
  - Then, reverse the first `k` and the remaining parts to correct their order.

- **Left Rotation**:
  - Think of moving the first `k` elements to the end.
  - Reverse the entire array to move them to the end (but reversed).
  - Then, reverse the last `k` and the first `n - k` parts to correct their order.

### Example Walkthroughs

#### Right Rotation Example (`nums = [1,2,3,4,5,6,7]`, `k = 3`)

1. **Reverse Entire Array**: `[7,6,5,4,3,2,1]`
2. **Reverse First `k=3` Elements**: `[5,6,7,4,3,2,1]`
3. **Reverse Remaining `n - k=4` Elements**: `[5,6,7,1,2,3,4]`

#### Left Rotation Example (`nums = [1,2,3,4,5,6,7]`, `k = 3`)

1. **Reverse Entire Array**: `[7,6,5,4,3,2,1]`
2. **Reverse Last `k=3` Elements**: `[7,6,5,1,2,3,4]`
3. **Reverse First `n - k=4` Elements**: `[4,5,6,7,1,2,3]`

### Edge Cases

- **`k = 0` or `k = n`**: The array remains unchanged.
- **`k > n`**: Use `k % n` to find effective rotations.
- **Empty Array or Single Element**: No rotation needed.

### Final Answer

To identify which parts of the array to reverse for left or right rotation:

1. **Right Rotation**:

   - Reverse the entire array.
   - Reverse the first `k` elements.
   - Reverse the remaining `n - k` elements.

2. **Left Rotation**:
   - Reverse the entire array.
   - Reverse the last `k` elements.
   - Reverse the first `n - k` elements.

This method ensures the array is rotated efficiently in-place with minimal operations.

### Code Implementation

```javascript
function rotateRight(nums, k) {
  const n = nums.length;
  k = k % n;
  reverse(nums, 0, n - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, n - 1);
}

function rotateLeft(nums, k) {
  const n = nums.length;
  k = k % n;
  reverse(nums, 0, n - 1);
  reverse(nums, n - k, n - 1);
  reverse(nums, 0, n - k - 1);
}

function reverse(nums, start, end) {
  while (start < end) {
    const temp = nums[start];
    nums[start] = nums[end];
    nums[end] = temp;
    start++;
    end--;
  }
}
```

### Summary

- **Right Rotation**: Entire → First `k` → Remaining.
- **Left Rotation**: Entire → Last `k` → First `n - k`.
- This approach is optimal and easy to implement once the reversal pattern is understood.
