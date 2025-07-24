# LC - 1482 Minimum Number of Days to Make m Bouquets

## Problem Description

You are given an integer array `bloomDay` of length n, an integer `m` and an integer `k`.
You want to make `m` bouquets. To make a bouquet, you need to use `k` adjacent flowers from the garden.
The flowers will bloom in `bloomDay[i]` days.

The problem is to find the `minimum number of days` you have to wait until you can make `m bouquets`.
Return the minimum number of days you have to wait until you can make m bouquets.

If it is impossible to make m bouquets return -1.

**Example 1:**
Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
Explanation: We can make the following bouquets:

- [1] from bloomDay[0]
- [3] from bloomDay[2]
- [2] from bloomDay[4]
  So we need to wait 3 days before we can make the bouquets.

## Intuition

- The goal is to find the `minimum of days` such that we can form `m` bouquets, where each bouquet requires `k` adjacent flowers that have bloomed by that day.
- If it’s impossible to make `m` bouquets (e.g., due to insufficient flowers or non-adjacent blooms), we return -1.

Key observations:

1. If `m * k` > total flowers, it's impossible (return -1)
2. The answer must be between the minimum and maximum bloom days
3. For any given day, we can check if it's possible to make the bouquets

- **Binary Search on Days:**

  - The answer (minimum days) lies between the minimum and maximum values in `bloomDay`.
  - We can use binary search to find the minimum days that allows us to make `m` bouquets.

- **Feasibility Check:**

  - For a given day, we can check if it’s possible to make `m` bouquets by counting groups of `k` adjacent bloomed flowers.
  - A flower at index `i` is bloomed if `bloomDay[i] <= day`.

- **Edge Cases**:

  - If `m * k > n` (where n is the length of bloomDay), it’s impossible to make m bouquets, as we don’t have enough flowers.
  - If there are enough flowers but they are not adjacent, we may still fail to form m bouquets.

- **Monotonic Property:**
  - If we can make `m` bouquets on day `d`, we can also make them on any day `d' > d`. If we cannot make `m` bouquets on day `d`, we cannot make them on any day `d' < d`. This makes binary search suitable.

## Approaches

### 1. Brute Force (Linear Search)

- Check each day from min to max bloom day
- For each day, count how many bouquets can be made
- Return the first day that satisfies the requirement

```javascript
//Approach 1: Linear Search with Greedy Check
function minDaysToMakeBouquetsLinear(bloomDay, m, k) {
  const totalFlowersNeeded = m * k;
  if (bloomDay.length < totalFlowersNeeded) return -1;

  const minDay = Math.min(...bloomDay);
  const maxDay = Math.max(...bloomDay);

  for (let day = minDay; day <= maxDay; day++) {
    if (canMakeBouquets(bloomDay, m, k, day)) {
      return day;
    }
  }

  return -1;
}

/**
 * Helper function to check if m bouquets can be made by a specific day
 * @param {number[]} bloomDay - Array of bloom days
 * @param {number} m - Required bouquets
 * @param {number} k - Flowers per bouquet
 * @param {number} day - The day to check
 * @return {boolean} True if possible, false otherwise
 */
function canMakeBouquets(bloomDay, m, k, day) {
  let bouquetsMade = 0; // Count of complete bouquets
  let adjacentFlowers = 0; // Count of consecutive bloomed flowers

  for (const bloom of bloomDay) {
    if (bloom <= day) {
      // Flower has bloomed by this day
      adjacentFlowers++;

      // If we have enough for a bouquet
      if (adjacentFlowers === k) {
        bouquetsMade++;
        adjacentFlowers = 0; // Reset counter
      }
    } else {
      // Flower hasn't bloomed - reset consecutive counter
      adjacentFlowers = 0;
    }

    // Early exit if we've made enough bouquets
    if (bouquetsMade >= m) return true;
  }

  return bouquetsMade >= m;
}
```

**Time Complexity**: O(n \* (maxDay - minDay)) - In worst case, we check every day between min and max
**Space Complexity**: O(1) - Constant extra space

### 2. Binary Search (Optimal)

- Use binary search between min and max bloom days
- For each mid day, check if we can make enough bouquets
- Adjust search range based on the result

```javascript
//Approach 2: Binary Search with Greedy Check
/**
 * Finds the minimum number of days needed to make m bouquets using k adjacent flowers
 * using binary search for optimal performance.
 * @param {number[]} bloomDay - Array where bloomDay[i] is the day the ith flower blooms
 * @param {number} m - Number of bouquets needed
 * @param {number} k - Number of adjacent flowers needed per bouquet
 * @return {number} Minimum days needed or -1 if impossible
 */
function minDaysToMakeBouquets(bloomDay, m, k) {
  // Calculate total flowers needed and check if it's possible
  const totalFlowersNeeded = m * k;
  if (bloomDay.length < totalFlowersNeeded) {
    return -1; // Not enough flowers in total
  }

  // Initialize binary search boundaries
  let left = Math.min(...bloomDay); // Earliest possible day
  let right = Math.max(...bloomDay); // Latest possible day
  let result = -1; // Stores our answer

  // Binary search loop
  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // Middle day to check

    // If we can make bouquets by 'mid' days, try to find a smaller day
    if (canMakeBouquets(bloomDay, m, k, mid)) {
      result = mid;
      right = mid - 1; // Search left half
    } else {
      left = mid + 1; // Search right half
    }
  }

  return result;
}
```

**Time Complexity**: O(n log(maxDay - minDay)) - Binary search reduces the search space logarithmically
**Space Complexity**: O(1) - Constant extra space

## Dry Runs

### Example 1:

Input: [1,10,3,10,2], m = 3, k = 1

- Binary search between 1 and 10
- mid = 5 → can make 3 bouquets (1,3,2 bloomed)
- mid = 3 → can make 3 bouquets
- mid = 2 → can make 2 bouquets
- So answer is 3

### Example 2:

Input: [1,10,3,10,2], m = 3, k = 2

- m\*k = 6 > 5 → return -1 immediately

### Example 3:

Input: [7,7,7,7,12,7,7], m = 2, k = 3

- Binary search between 7 and 12
- mid = 9 → can make 1 bouquet (first 4 flowers)
- mid = 10 → same
- mid = 11 → same
- mid = 12 → can make 2 bouquets (first 4 and last 3)
- So answer is 12

The binary search approach is optimal as it efficiently narrows down the search space, making it much faster than the brute force approach for large input ranges.
