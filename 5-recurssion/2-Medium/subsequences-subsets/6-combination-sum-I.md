# LC-39 Combination Sum

### Problem Statement

Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.
The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.
The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.
Example 1:
Input: candidates = `[2,3,6,7]`, target = 7
Output: `[[2,2,3],[7]]`
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.

## **Intuition**

**Choices:** For each candidate, we can: - Include it in the combination, add its value to the current sum, and recurse (staying at the same index to allow reuse). - Exclude it and move to the next candidate (increment the index).
**Base Cases:** - If the current sum equals the target, we’ve found a valid combination. - If the sum exceeds the target or we’ve processed all candidates, stop exploring that path.
**Avoiding Duplicates:** Since candidates are distinct and we process them in order, combinations are unique based on the frequency of numbers used.
**Backtracking:** After including a candidate, we backtrack by removing it to try excluding it or including the next candidate

## **Approach**

- Sort the candidates (optional but helps with readability and pruning).

- Use a recursive function that tracks:

  - Current index in the candidates array.
  - Current sum of the combination.
  - Current combination being built.

- At each step:

  - Include: Add the current candidate to the combination, update the sum, and recurse with the same index (to allow reuse).
  - Exclude: Skip the current candidate and recurse with the next index.

- Store valid combinations in a result array.

## Code

```javascript
/**
 * Finds all unique combinations of candidates that sum to target using include-exclude pattern.
 * @param {number[]} candidates - Array of distinct integers
 * @param {number} target - Target sum
 * @return {number[][]} - List of all unique combinations
 */
function combinationSum(candidates, target) {
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

    // Exclude current candidate (move to next)
    backtrack(index + 1, currentSum, currentCombo);

    // Include current candidate
    currentCombo.push(candidates[index]);
    backtrack(index, currentSum + candidates[index], currentCombo);
    currentCombo.pop(); // Backtrack by removing the candidate
  }

  // Start backtracking from index 0 with empty combination
  backtrack(0, 0, []);
  return result;
}
```

```javascript
/**
 * Without pop()
 * @param {number[]} candidates - Array of distinct integers
 * @param {number} target - Target sum
 * @return {number[][]} - List of all unique combinations
 */
function combinationSum(candidates, target) {
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

    // Exclude current candidate (move to next) without addition
    backtrack(index + 1, currentSum, currentCombo);

    // Include current candidate, dont increase index to allow duplicates
    backtrack(index, currentSum + candidates[index], [
      ...currentCombo,
      candidates[index],
    ]);
    // currentCombo.push(candidates[index]);
    // backtrack(index, currentSum + candidates[index], [...currentCombo]);
    // currentCombo.pop(); // Backtrack by removing the candidate
  }

  // Start backtracking from index 0 with empty combination
  backtrack(0, 0, []);
  return result;
}
```

## **Explanation**

- **Function Signature:** `combinationSum(candidates, target)` takes the input array and target sum.
- **Result Array:** result stores all valid combinations.
- **Backtrack Function:**
  **Parameters:**

  - `index`: Current position in the candidates array.
  - `currentSum`: Sum of numbers in currentCombo.
  - `currentCombo`: Array of numbers forming the current combination.

- **Base Cases:**

  - If `currentSum === target`, copy currentCombo to result.
    -If `currentSum > target` or `index >= candidates.length`, stop this path.

- **Include Path:**

  - Add the current candidate `(candidates[index])` to currentCombo.
  - Recurse with the same index (to allow reuse) and updated sum.
  - Backtrack by removing the candidate (pop).

- **Exclude Path:**

  - Skip the current candidate and recurse with `index + 1`.

- **Copying Combination:**
  - `[...currentCombo]` creates a new array to avoid modifying the original during backtracking.

### **Time and Space Complexity**

- **Time Complexity**: \(O(2^N)\) in the worst case, where \(N\) is the number of candidates. This is because, for each candidate, we decide to include or exclude it.
- **Space Complexity**: \(O(T)\) where \(T\) is the target (due to recursion stack depth). The space for storing results is not counted towards auxiliary space.

### **Dry Run Examples**

#### **Example 1**: `candidates = [2, 3, 6, 7], target = 7`

1. Start with `[]`, remaining `7`, index `0`.
2. **Include `2`**:
   - `[2]`, remaining `5`, index `0`.
   - **Include `2`**:
     - `[2, 2]`, remaining `3`, index `0`.
     - **Include `2`**:
       - `[2, 2, 2]`, remaining `1`, index `0`.
       - **Include `2`**:
         - `[2, 2, 2, 2]`, remaining `-1` → Backtrack.
       - **Exclude `2`**:
         - `[2, 2, 2]`, remaining `1`, index `1`.
         - Proceeds but no valid path.
     - **Exclude `2`**:
       - `[2, 2]`, remaining `3`, index `1`.
       - **Include `3`**:
         - `[2, 2, 3]`, remaining `0` → Add to result.
3. **Exclude `2`**:
   - `[]`, remaining `7`, index `1`.
   - **Include `3`**:
     - `[3]`, remaining `4`, index `1`.
     - Proceeds but no valid path.
   - **Exclude `3`**: - `[]`, remaining `7`, index `2`. - **Include `6`**: - `[6]`, remaining `1`, index `2`. - Proceeds but no valid path. - **Exclude `6`**: - `[]`, remaining `7`, index `3`. - **Include `7`**: - `[7]`, remaining `0` → Add to result.
     **Output**: `[[2, 2, 3], [7]]`

#### **Example 2**: `candidates = [2, 3, 5], target = 8`

1. Start with `[]`, remaining `8`, index `0`.
2. **Include `2`**:
   - `[2]`, remaining `6`, index `0`.
   - **Include `2`**:
     - `[2, 2]`, remaining `4`, index `0`.
     - **Include `2`**:
       - `[2, 2, 2]`, remaining `2`, index `0`.
       - **Include `2`**:
         - `[2, 2, 2, 2]`, remaining `0` → Add to result.
       - **Exclude `2`**:
         - `[2, 2, 2]`, remaining `2`, index `1`.
         - Proceeds but no valid path.
     - **Exclude `2`**:
       - `[2, 2]`, remaining `4`, index `1`.
       - **Include `3`**:
         - `[2, 2, 3]`, remaining `1`, index `1`.
         - Proceeds but no valid path.
   - **Exclude `2`**:
     - `[2]`, remaining `6`, index `1`.
     - **Include `3`**:
       - `[2, 3]`, remaining `3`, index `1`.
       - **Include `3`**:
         - `[2, 3, 3]`, remaining `0` → Add to result.
     - **Exclude `3`**:
       - `[2]`, remaining `6`, index `2`.
       - **Include `5`**:
         - `[2, 5]`, remaining `1`, index `2`.
         - Proceeds but no valid path.
3. **Exclude `2`**:
   - `[]`, remaining `8`, index `1`.
   - **Include `3`**:
     - `[3]`, remaining `5`, index `1`.
     - Proceeds but no valid path.
   - **Exclude `3`**: - `[]`, remaining `8`, index `2`. - **Include `5`**: - `[5]`, remaining `3`, index `2`. - **Include `5`**: - `[5, 5]`, remaining `-2` → Backtrack. - **Exclude `5`**: - `[5]`, remaining `3`, index `3`. - Proceeds but no valid path.
     **Output**: `[[2, 2, 2, 2], [2, 3, 3], [3, 5]]`

#### **Example 3 (Edge Case)**: `candidates = [2], target = 1`

1. Start with `[]`, remaining `1`, index `0`.
2. **Include `2`**:
   - `[2]`, remaining `-1` → Backtrack.
3. **Exclude `2`**:
   - `[]`, remaining `1`, index `1`.
   - No more candidates.
     **Output**: `[]` (No valid combinations).

This approach efficiently explores all valid combinations while avoiding duplicates by systematically including or excluding each candidate. The **include-exclude pattern** is a clear and intuitive way to handle such problems.
