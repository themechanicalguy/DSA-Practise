# Search for Boundaries (Leftmost/Rightmost Occurrence)

### Pattern

Find the **first** or **last** occurrence of a target element in a sorted array with duplicates.

### Key Insight

Modify binary search to continue searching toward the **left** or **right** after finding a match to locate the boundary.

### Time Complexity

- **O(log n)**

### Examples

1. Find the first and last position of an element in a sorted array.  
   _(e.g., LeetCode: Find First and Last Position of Element in Sorted Array)_

2. Find the leftmost insertion point for a target.

### Conditions

- Input is a **sorted array** with possible duplicates.
- Requires tweaking the binary search logic to bias toward one side after finding a match.
