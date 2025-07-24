# Binary Search on Answer (Search for Optimal Value)

**Pattern**: Find the smallest/largest value that satisfies a condition by testing possible values in a sorted range.

---

### Key Insight:

Instead of searching for an element in an array, search for the answer in a range of possible values, using a condition to determine whether to move left or right.

---

### Time Complexity:

**O(log n) \* O(f)**, where `f` is the cost of evaluating the condition.

---

### Examples:

1. **Find the square root of a number**  
   _(e.g., LeetCode: Sqrt(x))_

2. **Find the smallest capacity to ship packages within D days**  
   _(e.g., LeetCode: Capacity To Ship Packages Within D Days)_

3. **Find the minimum speed to arrive on time**  
   _(e.g., LeetCode: Minimum Speed to Arrive on Time)_

---

### Conditions:

- The solution space (e.g., range of possible answers) is **monotonic** or can be evaluated to determine which half to explore.
- Often used when the answer involves **optimization** (minimize/maximize).
