# LC 216. Combination Sum III

## Problem Understanding

Find all valid combinations of k numbers that sum up to n such that the following conditions are true:

- Only numbers 1 through 9 are used.
- Each number is used at most once.

Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.

Example 1:

Input: k = 3, n = 7
Output: [[1,2,4]]
Explanation:
1 + 2 + 4 = 7
There are no other valid combinations.

## **Intuition**

The problem requires finding all unique combinations of exactly ( k ) numbers from the range 1 to 9, where each number is used at most once, and the sum of the numbers equals ( n ). This is a variation of the combination sum problem, with constraints on the number of elements (( k )) and the candidate range (1 to 9). We’ll use backtracking to explore all possible combinations, ensuring uniqueness by processing numbers in order and avoiding duplicates.

**Constraints:**

- Only numbers 1 to 9 are available.
- Each number can be used at most once, so we move to the next index after including a number.
- The combination must have exactly ( k ) numbers.
- The sum of the combination must be exactly ( n ).

**Base Cases:** - If the current combination has ( k ) numbers and sums to ( n ), add it to the result.
If the sum exceeds ( n ), the combination has more than ( k ) numbers, or we run out of numbers, stop exploring.

**Avoiding Duplicates:** Since we use numbers 1 to 9 (all distinct) and process them in order, combinations are naturally unique if we don’t revisit earlier indices.

**Backtracking:** We need to build combinations of exactly ( k ) numbers that sum to ( n ). For each number from 1 to 9, we can:

- Include the number in the current combination if it doesn’t exceed the target sum and we haven’t used ( k ) numbers yet.
- Exclude the number and move to the next one.

## **Approach**

- Sort the candidates (optional but helps with readability and pruning).

- **Candidate Array:** Create an array [1, 2, ..., 9] as the candidate numbers.
  **Backtracking:**
- Track the current index, current sum, current combination, and the count of numbers used.

- For each number starting from the current index:

  - Include the number if it’s valid (doesn’t exceed ( n ), count < ( k )).
  - Exclude the number and move to the next index.

- Check base cases to add valid combinations or stop exploration.

**Optimization:** Optionally, prune branches early by checking if the remaining numbers can make up the target sum.

We’ll explore two approaches:

- Include-Exclude Backtracking (Immutability): Create new arrays for each recursive call, avoiding pop.
- Include-Exclude Backtracking (Mutable): Use push and pop to modify the combination array.

### Approach 1: Include-Exclude Backtracking (Immutability, No pop)

```javascript
/**
 * Finds all unique combinations of k numbers from 1 to 9 that sum to n.
 * @param {number} k - Number of elements in each combination
 * @param {number} n - Target sum
 * @return {number[][]} - List of all valid combinations
 */
function combinationSum3(k, n) {
  // Array of candidates: numbers 1 to 9
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // Store all valid combinations
  const result = [];

  /**
   * Recursive helper function using include-exclude pattern
   * @param {number} index - Current index in candidates
   * @param {number} currentSum - Current sum of combination
   * @param {number[]} currentCombo - Current combination
   * @param {number} count - Number of elements in current combination
   */
  function backtrack(index, currentSum, currentCombo, count) {
    // Base case: if count equals k and sum equals n, add to result
    if (count === k && currentSum === n) {
      result.push([...currentCombo]);
      return;
    }
    // Base case: if sum exceeds n, count exceeds k, or out of candidates, stop
    if (currentSum > n || count > k || index >= candidates.length) {
      return;
    }

    // Include current number
    backtrack(
      index + 1,
      currentSum + candidates[index],
      [...currentCombo, candidates[index]],
      count + 1
    );

    // Exclude current number
    backtrack(index + 1, currentSum, currentCombo, count);
  }

  // Start backtracking from index 0
  backtrack(0, 0, [], 0);
  return result;
}
```

# Approach 2: Include-Exclude Backtracking (Mutable, Using pop)

```javascript
/**
 * Finds all unique combinations of k numbers from 1 to 9 that sum to n.
 * @param {number} k - Number of elements in each combination
 * @param {number} n - Target sum
 * @return {number[][]} - List of all valid combinations
 */
function combinationSum3(k, n) {
  // Array of candidates: numbers 1 to 9
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // Store all valid combinations
  const result = [];

  /**
   * Recursive helper function using include-exclude with mutation
   * @param {number} index - Current index in candidates
   * @param {number} currentSum - Current sum of combination
   * @param {number[]} currentCombo - Current combination
   * @param {number} count - Number of elements in current combination
   */
  function backtrack(index, currentSum, currentCombo, count) {
    // Base case: if count equals k and sum equals n, add to result
    if (count === k && currentSum === n) {
      result.push([...currentCombo]);
      return;
    }
    // Base case: if sum exceeds n, count exceeds k, or out of candidates, stop
    if (currentSum > n || count > k || index >= candidates.length) {
      return;
    }

    // Include current number
    currentCombo.push(candidates[index]);
    backtrack(
      index + 1,
      currentSum + candidates[index],
      currentCombo,
      count + 1
    );
    currentCombo.pop(); // Backtrack by removing the number

    // Exclude current number
    backtrack(index + 1, currentSum, currentCombo, count);
  }

  // Start backtracking from index 0
  backtrack(0, 0, [], 0);
  return result;
}
```
