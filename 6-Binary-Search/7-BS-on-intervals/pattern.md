# Pattern: Binary Search on Intervals

Solve problems involving **intervals**, **timestamps**, or **events** by searching for a critical point (e.g., earliest time, minimum value).

---

## Key Insight

Treat **time**, **indices**, or other continuous/discrete quantities as the search space and evaluate conditions to narrow it down.

---

## Time Complexity

**O(log n) × O(f)**, where `f` is the cost of evaluating the condition.

---

## Examples

- Find the earliest time when all tasks can be completed (e.g., scheduling problems).
- Find the minimum time to complete jobs with deadlines.

---

## Conditions

1. The search space (e.g., time, intervals) is **ordered**.
2. A condition exists to evaluate **feasibility** at each point.
