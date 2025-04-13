# Pattern: Binary Search on Implicitly Sorted Spaces

Binary search can be applied to problems where the search space isn’t an explicit sorted array but behaves like one (e.g., indices, time, or other ordered quantities).

## Key Insight

- Define a **search space** (e.g., range of indices or values).
- Establish a **condition** that allows you to eliminate half of the search space in each step.

## Time Complexity

- **O(log n) \* O(f)**, where `f` is the cost of evaluating the condition.

## Examples

1. **Find the kth smallest element in a sorted matrix**

   - Problem: [LeetCode: Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/)

2. **Guess a number in a number guessing game**
   - Problem: [LeetCode: Guess Number Higher or Lower](https://leetcode.com/problems/guess-number-higher-or-lower/)

## Conditions

1. The search space must have an **order** (explicit or implicit).
2. A **condition** must exist to decide which half of the search space to discard.
