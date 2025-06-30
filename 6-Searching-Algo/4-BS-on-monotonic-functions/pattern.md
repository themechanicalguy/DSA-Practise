# Pattern: Binary Search on Monotonic Functions

## Key Insight

Binary search can efficiently find the transition point in a monotonic sequence of true/false values, even if the sequence isn’t explicitly stored.

## Time Complexity

**O(log n) \* O(f)**, where `f` is the cost of evaluating the function.

## Examples

- **Find the median of two sorted arrays**  
  Example: LeetCode problem "Median of Two Sorted Arrays".
- **Find the point where a function changes behavior**  
  Example: Smallest `x` where `f(x) ≥ target`.

## Conditions

- The function or property being tested must be monotonic.
- Often involves implicit arrays or computed values.
