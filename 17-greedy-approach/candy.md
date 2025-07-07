# LC 135. Candy

There are `n` children standing in a line. Each child is assigned a rating value given in the integer array `ratings`.

You are giving candies to these children subjected to the following requirements:

- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.

Return the minimum number of candies you need to have to distribute the candies to the children.

**Example 1:**

- Input: ratings = [1,0,2]
- Output: 5
- Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.

**Example 2:**

- Input: ratings = [1,2,2]
- Output: 4
- Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively. The third child gets 1 candy because it satisfies the above two conditions.

## Problem Understanding

We need to distribute candies to children standing in a line, each with a rating. The rules are:

1. Each child must get at least one candy.
2. A child with a higher rating than their immediate neighbor(s) must receive more candies than those neighbors.

Our goal is to find the minimum total number of candies required to satisfy these conditions.

### Intuition

The problem requires us to ensure that each child's candy count respects the ratings of their immediate neighbors. This suggests that we need to consider the relative ratings of neighbors when assigning candies.

A key observation is that the candy distribution depends on both the left and right neighbors. Therefore, a two-pass approach is efficient:

1. **Left to Right Pass**: Ensure that each child has more candies than their left neighbor if their rating is higher.
2. **Right to Left Pass**: Ensure that each child has more candies than their right neighbor if their rating is higher, while also not violating the left neighbor condition.

This way, we satisfy both left and right neighbor conditions in two separate passes, and then take the maximum of the two passes for each child to ensure both conditions are met.

### Approaches

1. **Two-Pass Greedy Approach**:
   - Initialize an array `candies` where each child gets at least 1 candy.
   - **First Pass (Left to Right)**: For each child from left to right, if their rating is higher than the left neighbor, ensure their candy count is one more than the left neighbor.
   - **Second Pass (Right to Left)**: For each child from right to left, if their rating is higher than the right neighbor, ensure their candy count is at least one more than the right neighbor (but possibly higher if the left neighbor condition requires it).
   - Sum the `candies` array for the total minimum candies.

### Solution Code

```javascript
/**
 * @param {number[]} ratings
 * @return {number}
 */
function candy(ratings) {
  const n = ratings.length;
  if (n === 0) return 0;

  // Initialize each child with at least 1 candy
  const candies = new Array(n).fill(1);

  // Left to Right pass: ensure higher rated children have more candies than their left neighbor
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // Right to Left pass: ensure higher rated children have more candies than their right neighbor
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  // Sum all candies
  return candies.reduce((sum, num) => sum + num, 0);
}
```

### Explanation

1. **Initialization**: We start by giving each child 1 candy, as per the first rule.
2. **Left to Right Pass**: For each child, if their rating is higher than the left neighbor, we set their candy count to be one more than the left neighbor's. This ensures the left neighbor condition is met.
3. **Right to Left Pass**: For each child, if their rating is higher than the right neighbor, we set their candy count to be the maximum of its current value (from the left pass) or one more than the right neighbor's. This ensures the right neighbor condition is met without violating the left condition.
4. **Summing Candies**: Finally, we sum up all the candies to get the minimum total required.

### Time and Space Complexity

- **Time Complexity**: O(n), where n is the number of children. We make two passes over the array, each taking O(n) time.
- **Space Complexity**: O(n), for storing the `candies` array.

### Dry Run Examples

**Example 1: ratings = [1, 0, 2]**

- Initial candies: [1, 1, 1]
- Left to Right:
  - i=1: ratings[1] (0) <= ratings[0] (1) → no change.
  - i=2: ratings[2] (2) > ratings[1] (0) → candies[2] = 2.
  - candies: [1, 1, 2]
- Right to Left:
  - i=1: ratings[1] (0) <= ratings[2] (2) → no change.
  - i=0: ratings[0] (1) > ratings[1] (0) → candies[0] = max(1, 1+1) = 2.
  - candies: [2, 1, 2]
- Sum: 2 + 1 + 2 = 5. **Output: 5**

**Example 2: ratings = [1, 2, 2]**

- Initial candies: [1, 1, 1]
- Left to Right:
  - i=1: ratings[1] (2) > ratings[0] (1) → candies[1] = 2.
  - i=2: ratings[2] (2) <= ratings[1] (2) → no change.
  - candies: [1, 2, 1]
- Right to Left:
  - i=1: ratings[1] (2) <= ratings[2] (2) → no change.
  - i=0: ratings[0] (1) <= ratings[1] (2) → no change.
  - candies: [1, 2, 1]
- Sum: 1 + 2 + 1 = 4. **Output: 4**

**Example 3: ratings = [1, 3, 2, 2, 1]**

- Initial candies: [1, 1, 1, 1, 1]
- Left to Right:
  - i=1: 3 > 1 → candies[1] = 2.
  - i=2: 2 <= 3 → no change.
  - i=3: 2 <= 2 → no change.
  - i=4: 1 <= 2 → no change.
  - candies: [1, 2, 1, 1, 1]
- Right to Left:
  - i=3: 2 > 1 → candies[3] = max(1, 1+1) = 2.
  - i=2: 2 > 2 → no.
  - i=1: 3 > 2 → candies[1] = max(2, 1+1) = 2.
  - i=0: 1 <= 3 → no change.
  - candies: [1, 2, 1, 2, 1]
- Sum: 1 + 2 + 1 + 2 + 1 = 7. **Output: 7**

This approach efficiently ensures both neighbor conditions are met with minimal passes and optimal space usage.
