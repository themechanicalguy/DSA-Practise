# 605. Can Place Flowers

You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.

Given an integer array `flowerbed` containing `0's` and `1's`, where `0` means empty and `1` means not empty, and an integer `n`, return `true` if `n` new flowers can be planted in the `flowerbed` without violating the no-adjacent-flowers rule and false otherwise.

Example 1:

- Input: flowerbed = [1,0,0,0,1], n = 1
- Output: true

Example 2:

- Input: flowerbed = [1,0,0,0,1], n = 2
- Output: false

### Problem Understanding

We have a flowerbed represented by an array of 0s and 1s, where:

- `0` means the plot is empty.
- `1` means the plot is already planted.

We need to plant `n` new flowers in the flowerbed following the rule that no two flowers can be adjacent. We should determine if it's possible to plant `n` new flowers without violating this rule.

### Intuition

To solve this problem, we need to find all the valid empty plots where a new flower can be planted without being adjacent to any existing flowers. The key is to scan the flowerbed and check each empty plot to see if its adjacent plots are also empty. If so, we can plant a flower there and mark it as planted, then continue scanning the rest of the flowerbed.

- A plot can have a flower planted (set to 1) if it is empty (0) and its adjacent plots (if they exist) are also empty (0).
  For each plot at index i, we need to check:
  - `flowerbed[i] == 0` (the plot is empty).
  - `flowerbed[i-1] == 0 or i == 0` (no flower in the previous plot or it’s the first plot).
  - `flowerbed[i+1] == 0 or i == flowerbed.length - 1` (no flower in the next plot or it’s the last plot).
- We count how many flowers can be planted and check if this number is at least n.

**Edge Cases:**

- Empty flowerbed (`flowerbed = []`).
- Single plot (`flowerbed = [0] or [1]`).
- All plots occupied (`flowerbed = [1,1,1]`).
- All plots empty (`flowerbed = [0,0,0]`).
- Large n that exceeds possible plantings.
- Flowerbed with alternating patterns (`[1,0,1,0,1]`).

### Approaches

1. **Greedy Approach**: Iterate through the flowerbed and plant flowers in every valid empty plot immediately when found. This works because planting a flower as early as possible allows maximizing the number of flowers planted.
   - Check each plot:
     - If the current plot is empty (`0`), and the previous and next plots are also empty (or out of bounds), then plant a flower here (`1`), increment the count, and skip the next plot (since it's now adjacent).
   - After scanning, if the count of planted flowers is >= `n`, return `true`; else `false`.

### Solution Code

```javascript
/**
 * Determines if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule.
 * @param {number[]} flowerbed - Array representing the flowerbed where 0 is empty and 1 is planted.
 * @param {number} n - Number of new flowers to plant.
 * @return {boolean} - True if n flowers can be planted, false otherwise.
 */
function canPlaceFlowers(flowerbed, n) {
  let count = 0;
  const length = flowerbed.length;

  for (let i = 0; i < length; i++) {
    if (flowerbed[i] === 0) {
      // Check if the previous and next plots are empty or out of bounds
      const prevEmpty = i === 0 || flowerbed[i - 1] === 0;
      const nextEmpty = i === length - 1 || flowerbed[i + 1] === 0;

      if (prevEmpty && nextEmpty) {
        flowerbed[i] = 1; // Plant the flower
        count++;

        if (count >= n) {
          return true;
        }

        i++; // Skip the next plot since it cannot be planted now
      }
    }
  }

  return count >= n;
}
```

### Explanation

1. **Initialization**: We start with a count of planted flowers set to `0`.
2. **Iteration**: Loop through each plot in the flowerbed.
3. **Check for Empty Plot**: If the current plot is empty (`0`), check if the previous and next plots are also empty or out of bounds.
4. **Plant Flower**: If both adjacent plots are empty, plant a flower (`1`), increment the count, and skip the next plot (since it's now adjacent to the newly planted flower).
5. **Early Termination**: If at any point the count reaches or exceeds `n`, return `true` immediately.
6. **Final Check**: After the loop, check if the count is >= `n` and return the result.

### Time and Space Complexity

- **Time Complexity**: O(n), where n is the length of the flowerbed. We traverse the flowerbed once.
- **Space Complexity**: O(1), as we are using constant extra space.

### Dry Run with Examples

**Example 1:**

- Input: `flowerbed = [1,0,0,0,1]`, `n = 1`
- Steps:
  1. i = 0: flowerbed[0] = 1 → skip.
  2. i = 1: flowerbed[1] = 0. prev (i=0) is 1 → not valid.
  3. i = 2: flowerbed[2] = 0. prev (i=1) is 0, next (i=3) is 0 → valid. Plant flower, count = 1, skip i=3.
  4. i = 4: flowerbed[4] = 1 → skip.
- count (1) >= n (1) → return `true`.

**Example 2:**

- Input: `flowerbed = [1,0,0,0,1]`, `n = 2`
- Steps:
  1. Same as above, count reaches 1 after i=2.
  2. i = 4: flowerbed[4] = 1 → skip.
- count (1) < n (2) → return `false`.

**Edge Case Example:**

- Input: `flowerbed = [0,0,0,0,0]`, `n = 3`
- Steps:
  1. i = 0: flowerbed[0] = 0. prev is out of bounds, next (i=1) is 0 → valid. Plant, count = 1, skip i=1.
  2. i = 2: flowerbed[2] = 0. prev (i=1) is 0 (but was skipped), next (i=3) is 0 → valid. Plant, count = 2, skip i=3.
  3. i = 4: flowerbed[4] = 0. prev (i=3) is 0 (skipped), next is out of bounds → valid. Plant, count = 3.
- count (3) >= n (3) → return `true`.

This approach efficiently checks each plot and plants flowers greedily, ensuring optimal placement without violating the adjacency rule.
