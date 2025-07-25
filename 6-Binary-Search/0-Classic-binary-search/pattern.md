# Classic Binary Search

**Pattern**: Find a specific target element in a sorted array or determine if it exists.

**Key Insight**:  
The data is sorted, allowing you to eliminate half of the _search space_ in each step by comparing the middle element with the target.

**Time Complexity**: O(log n)

## Examples

1. **Find an element in a sorted array**  
   _(e.g., LeetCode: Binary Search)_

2. **Determine the insertion point for a target in a sorted array**

## Conditions

- The array/list must be sorted.
- Direct comparison with the target is possible.
