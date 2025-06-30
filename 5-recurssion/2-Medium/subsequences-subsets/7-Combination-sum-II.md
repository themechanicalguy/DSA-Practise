# 40. Combination Sum II

### Problem Statement

Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.
Each number in candidates may only be used once in the combination.
Note: The solution set must not contain duplicate combinations.
Example 1:
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]

**Summary**

This problem is a variation of the combination sum problem, but with a key difference: each number in the candidates array can only be used once in a combination. We need to find all unique combinations that sum to the target, ensuring no duplicate combinations are included. We’ll use the include-exclude pattern with backtracking, similar to the previous solution, but adapt it to handle the single-use constraint and avoid duplicates.

## **Intuition**

**Include-Exclude Pattern:** For each candidate, we decide to either:

- Include it in the current combination and move to the next index (since each number can be used only once).
- Exclude it and move to the next index without including it.

**Single-Use Constraint:** Unlike the previous problem, we cannot reuse the same candidate, so when including a number, we recurse with index + 1.

**Avoiding Duplicates:** Since the input may contain duplicate candidates `(e.g., [1,1,6])`, we must ensure that combinations are unique. To avoid duplicate combinations, we:

- Sort the candidates array to group duplicates together.
- Skip duplicate candidates at the same recursive level when excluding a number.

**Base Cases:** -

- If the current sum equals the target, add the combination to the result
- If the sum exceeds the target or we run out of candidates, stop exploring the path.

**Backtracking:** We build combinations incrementally, and since we’re not reusing numbers, we don’t need to backtrack by removing elements in the same way as before. Instead, we pass new arrays to maintain immutability, as done in the previous solution without pop.

## **Approach**

**Sort the candidates:** Sorting ensures duplicates are adjacent, making it easier to skip them.

**Recursive Backtracking:**

- Track the current index, current sum, and current combination.
- For each candidate at the current index:

  - Include: Add the candidate to the combination, update the sum, and recurse with the next index.
  - Exclude: Skip the candidate and recurse with the next index, but skip duplicate candidates to avoid duplicate combinations.

- Base cases handle when the sum equals the target or becomes invalid.

- **Immutability:** Create a new combination array for each recursive call to avoid using pop.
- **Result Storage:** Store valid combinations in a result array.

## Code

```javascript
/**
 * Finds all unique combinations of candidates that sum to target, using each number at most once.
 * @param {number[]} candidates - Array of integers (may contain duplicates)
 * @param {number} target - Target sum
 * @return {number[][]} - List of all unique combinations
 */
function combinationSum2(candidates, target) {
  // Sort candidates to handle duplicates
  candidates.sort((a, b) => a - b);

  // Store all valid combinations
  const result = [];

  /**
   * Recursive helper function using include-exclude pattern
   * @param {number} index - Current index in candidates
   * @param {number} currentSum - Current sum of combination
   * @param {number[]} currentCombo - Current combination
   */
  function backtrack(index, currentSum, currentCombo) {
    // Base case: if sum equals target, add combination to result
    if (currentSum === target) {
      result.push([...currentCombo]);
      return;
    }

    // Base case: if sum exceeds target or out of candidates, stop
    if (currentSum > target || index >= candidates.length) {
      return;
    }

    // Include current candidate
    backtrack(index + 1, currentSum + candidates[index], [
      ...currentCombo,
      candidates[index],
    ]);

    // Exclude current candidate and skip duplicates --main step
    let nextIndex = index + 1;
    while (
      nextIndex < candidates.length &&
      candidates[nextIndex] === candidates[index]
    ) {
      nextIndex++;
    }
    backtrack(nextIndex, currentSum, currentCombo);
  }

  // Start backtracking from index 0 with empty combination
  backtrack(0, 0, []);
  return result;
}
```

## **Explanation**

- **Sorting:** `candidates.sort((a, b) => a - b)` ensures duplicates are adjacent, allowing us to skip them easily.
- **Result Array:** `result` stores all valid combinations.
- **Backtrack Function:**
  **Parameters:**

  - `index`: Current position in the candidates array.
  - `currentSum`: Sum of numbers in currentCombo.
  - `currentCombo`: Array of numbers forming the current combination.

- **Base Cases:**

  - If `currentSum === target`, copy `currentCombo` to `result`.
    -If `currentSum > target` or `index >= candidates.length`, stop this path.

- **Include Path:**

  - Add the current candidate `(candidates[index])` to currentCombo.
  - Recurse with `index + 1` (no reuse allowed) and updated sum.

- **Exclude Path:**

  - Skip the current candidate and all subsequent duplicates by finding the next distinct candidate using a `while` loop.
  - Recurse with `nextIndex` and the same `currentCombo`.

- **Duplicate Handling:**

  - When excluding a candidate, we skip all duplicates at the same recursive level (e.g., if `candidates[index] == candidates[index + 1]`, skip until we find a different number).

- **Immutability:** No `push` or `pop`; we create new arrays with `[...currentCombo, candidates[index]]` for the include path.
