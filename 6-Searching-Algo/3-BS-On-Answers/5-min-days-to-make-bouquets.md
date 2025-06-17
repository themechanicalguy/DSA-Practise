# LC - 1482 Minimum Number of Days to Make m Bouquets

you are given an integer array bloomDay of length n, an integer m and an integer k.
You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden.
The flowers will bloom in bloomDay[i] days.
The problem is to find the minimum number of days you have to wait until you can make m bouquets.
Return the minimum number of days you have to wait until you can make m bouquets.
If it is impossible to make m bouquets return -1.
Example 1:
Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
Explanation: We can make the following bouquets:

1. [1] from bloomDay[0]
2. [3] from bloomDay[2]
3. [2] from bloomDay[4]
   So we need to wait 3 days before we can make the bouquets.
   Example 2:
   Input: bloomDay = [1,10,3,10,2], m = 3, k = 2
   Output: -1
   Explanation: We need 3 bouquets of size 2, but we can only make 1 bouquet of size 2.
   Example 3:
   Input: bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
   Output: 12
   Explanation: We can make the following bouquets:
4. [7,7,7] from bloomDay[0], bloomDay[1], bloomDay[2]
5. [12,7,7] from bloomDay[4], bloomDay[5], bloomDay[6]
   So we need to wait 12 days before we can make the bouquets.

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

## Intuition

This problem requires finding the minimum day by which we can gather enough adjacent blooming flowers to make `m` bouquets, each consisting of `k` adjacent flowers.

Key observations:

1. If `m * k` > total flowers, it's impossible (return -1)
2. The answer must be between the minimum and maximum bloom days
3. For any given day, we can check if it's possible to make the bouquets

## Approaches

### 1. Brute Force (Linear Search)

- Check each day from min to max bloom day
- For each day, count how many bouquets can be made
- Return the first day that satisfies the requirement

### 2. Binary Search (Optimal)

- Use binary search between min and max bloom days
- For each mid day, check if we can make enough bouquets
- Adjust search range based on the result

## Solution Code

### Approach 1: Brute Force

```javascript
function minDaysBruteForce(bloomDay, m, k) {
  const totalFlowersNeeded = m * k;
  if (totalFlowersNeeded > bloomDay.length) return -1;

  const minDay = Math.min(...bloomDay);
  const maxDay = Math.max(...bloomDay);

  for (let day = minDay; day <= maxDay; day++) {
    if (canMakeBouquets(bloomDay, m, k, day)) {
      return day;
    }
  }

  return -1;
}

function canMakeBouquets(bloomDay, m, k, day) {
  let bouquets = 0;
  let flowersInCurrentBouquet = 0;

  for (let i = 0; i < bloomDay.length; i++) {
    if (bloomDay[i] <= day) {
      flowersInCurrentBouquet++;
      if (flowersInCurrentBouquet === k) {
        bouquets++;
        flowersInCurrentBouquet = 0;
      }
    } else {
      flowersInCurrentBouquet = 0;
    }
  }

  return bouquets >= m;
}
```

**Time Complexity**: O(n \* (maxDay - minDay)) - In worst case, we check every day between min and max
**Space Complexity**: O(1) - Constant extra space

### Approach 2: Binary Search (Optimal)

```javascript
function minDays(bloomDay, m, k) {
  const totalFlowersNeeded = m * k;
  if (totalFlowersNeeded > bloomDay.length) return -1;

  let left = Math.min(...bloomDay);
  let right = Math.max(...bloomDay);
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (canMakeBouquets(bloomDay, m, k, mid)) {
      result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
}

function canMakeBouquets(bloomDay, m, k, day) {
  let bouquets = 0;
  let consecutiveFlowers = 0;

  for (let i = 0; i < bloomDay.length; i++) {
    if (bloomDay[i] <= day) {
      consecutiveFlowers++;
      if (consecutiveFlowers === k) {
        bouquets++;
        consecutiveFlowers = 0;
      }
    } else {
      consecutiveFlowers = 0;
    }

    if (bouquets >= m) return true;
  }

  return bouquets >= m;
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
