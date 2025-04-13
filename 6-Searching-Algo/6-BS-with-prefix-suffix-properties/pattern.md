# Binary Search with Prefix/Suffix Properties

## Pattern

Use binary search to find a point in an array where a prefix or suffix satisfies a certain property (e.g., sum, count).

## Key Insight

Compute a property (e.g., prefix sum) for the middle point and use it to decide whether the answer lies to the left or right.

## Time Complexity

**O(log n) \* O(f)**, where `f` is the cost of computing the property.

## Examples

- **Split an array into k subarrays with minimum max sum**  
  (e.g., LeetCode: _Split Array Largest Sum_).
- **Find the pivot where the prefix sum equals the suffix sum**.

## Conditions

The property (e.g., sum, count) must be:

1. Computable.
2. Monotonic or comparable across indices.
