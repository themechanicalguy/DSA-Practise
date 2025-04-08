//LC- 875 Koko Eating Banana
// Problem Statement
// Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas.
// The guards have gone and will come back in h hours.
// Koko can decide how many bananas to eat per hour. Each hour, she chooses some pile of bananas
// and eats bananas from that pile. If the pile has less than k bananas, she eats all of them instead.
// Koko likes to eat slowly but still wants to finish eating before the guards return.
// Return the minimum integer k such that she can eat all the bananas within h hours.
// Example 1:
// Input: piles = [3,6,7,11], h = 8
// Output: 4
// Example 2:
// Input: piles = [30,11,23,4,20], h = 5
// Output: 30
// Example 3:
// Input: piles = [30,11,23,4,20], h = 6
// Output: 23

//Brute Force Approach
// Time Complexity: O(n)
// Space Complexity: O(1)

/**
 * Brute force approach to find minimum eating speed
 * @param {number[]} piles - Array representing number of bananas in each pile
 * @param {number} h - Maximum hours available
 * @return {number} - Minimum eating speed k
 */
function minEatingSpeedBruteForce(piles, h) {
  // Start with minimum possible speed
  let eatingSpeed = 1;

  // Keep increasing speed until we find one that works
  while (true) {
    let hoursNeeded = 0;

    // Calculate total hours needed at current speed
    for (const pile of piles) {
      hoursNeeded += Math.ceil(pile / eatingSpeed);
    }

    // If we can eat all bananas within h hours, return current speed
    if (hoursNeeded <= h) {
      return eatingSpeed;
    }

    // Otherwise try faster speed
    eatingSpeed++;
  }
}

/**
 * Optimal binary search approach to find minimum eating speed
 * @param {number[]} piles - Array representing number of bananas in each pile
 * @param {number} h - Maximum hours available
 * @return {number} - Minimum eating speed k
 */
function minEatingSpeed(piles, h) {
  // The minimum possible speed is 1 (eat at least 1 banana/hour)
  let left = 1;
  // The maximum possible speed is the maximum pile size
  // (since eating faster than that doesn't help)
  let right = Math.max(...piles);
  let result = right; // Initialize with the maximum possible speed

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let hoursNeeded = 0;

    // Calculate total hours needed at current mid speed
    for (const pile of piles) {
      hoursNeeded += Math.ceil(pile / mid);
    }

    if (hoursNeeded <= h) {
      // If we can finish in time, try a slower speed
      result = Math.min(result, mid);
      right = mid - 1;
    } else {
      // If we can't finish in time, we need to eat faster
      left = mid + 1;
    }
  }

  return result;
}
