# Pattern: Combine Binary Search with Divide-and-Conquer

**Description:**  
Combine binary search with divide-and-conquer to solve problems that involve recursive splitting or partitioning.

---

## Key Insight

Binary search can help decide how to split the problem or select a partition point. This approach is often used in optimization problems.

---

## Time Complexity

- Varies depending on the subproblem.
- Common cases:
  - **O(log n) \* O(f)**
  - **O(n log n)**

---

## Examples

1. **Find the kth smallest element in two sorted arrays.**
2. **Solve problems like the Skyline Problem** (e.g., LeetCode: The Skyline Problem).

---

## Conditions

1. The problem can be partitioned based on a decision point.
2. Binary search helps identify the correct partition.
