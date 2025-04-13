//LC - 1482 Minimum Number of Days to Make m Bouquets
// you are given an integer array bloomDay of length n, an integer m and an integer k.
// You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden.
// The flowers will bloom in bloomDay[i] days.
// The problem is to find the minimum number of days you have to wait until you can make m bouquets.
// Return the minimum number of days you have to wait until you can make m bouquets.
// If it is impossible to make m bouquets return -1.
// Example 1:
// Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
// Output: 3
// Explanation: We can make the following bouquets:
// 1. [1] from bloomDay[0]
// 2. [3] from bloomDay[2]
// 3. [2] from bloomDay[4]
// So we need to wait 3 days before we can make the bouquets.
// Example 2:
// Input: bloomDay = [1,10,3,10,2], m = 3, k = 2
// Output: -1
// Explanation: We need 3 bouquets of size 2, but we can only make 1 bouquet of size 2.
// Example 3:
// Input: bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
// Output: 12
// Explanation: We can make the following bouquets:
// 1. [7,7,7] from bloomDay[0], bloomDay[1], bloomDay[2]
// 2. [12,7,7] from bloomDay[4], bloomDay[5], bloomDay[6]
// So we need to wait 12 days before we can make the bouquets.

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
