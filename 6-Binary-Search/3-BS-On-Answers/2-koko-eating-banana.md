# LC- 875 Koko Eating Banana

## Problem Statement

Koko loves to eat bananas. There are `n` piles of bananas, the `ith` pile has `piles[i]` bananas.The guards have gone and will come back in `h` hours.
Koko can decide how many bananas to eat per hour. Each hour, she chooses some pile of bananas and eats bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead. Koko likes to eat slowly but still wants to finish eating before the guards return.
Return the minimum integer `k` such that she can eat all the bananas within `h` hours.
Example 1:
Input: piles = `[3,6,7,11]`, h = 8
Output: 4
Example 2:
Input: piles = `[30,11,23,4,20]`, h = 5
Output: 30
Example 3:
Input: piles = `[30,11,23,4,20]`, h = 6
Output: 23

## Understanding Problem

- Let’s dive into solving the "Koko Eating Bananas" problem.
- The goal is to find the minimum integer eating speed `k` (`bananas per hour`) that allows Koko to eat all bananas in n piles within `h` hours, where each pile i has `piles[i]` bananas.
- If a pile has fewer than `k` bananas, Koko eats all of them in that hour and moves on. We need to minimize `k` while ensuring all bananas are consumed before the guards return in `h` hours.

## Intuition and Approach

The problem asks for the smallest `k` such that Koko can eat all bananas in at most `h` hours. Since `k` represents bananas eaten per hour, the total hours required to eat all bananas depend on `k`. A smaller `k` means more hours are needed, while a larger `k` reduces the hours but may be unnecessarily high. The key is to find the smallest `k` that keeps the total `hours ≤ h`.

## Key Insights:

**Feasible k Range:**

- The minimum possible `k` is `1` (eating at least 1 banana per hour).
- The maximum possible `k` is the size of the largest pile (`max(piles)`), as Koko cannot eat more bananas than are in a pile in one hour.
- Thus, `k` lies in the range `[1, max(piles)]`.

**Hours Calculation:**

- For a given `k`, the hours required to eat a pile of size `piles[i]` is `Math.ceil(piles[i] / k)`, because Koko eats `k` bananas per hour and needs enough hours to consume all bananas in the pile.
- Total hours = sum of `Math.ceil(piles[i] / k)` for all piles.
- We need this total to be `≤ h`.

**Monotonic Relationship:**

- As `k` increases, the hours required to eat all bananas decreases (fewer hours per pile).
- If a certain `k` allows Koko to finish in ≤ `h` hours, any `k' > k` will also work (but may be suboptimal).
- If a certain `k` requires > h hours, any `k' < k` will require even more hours and won’t work.

This suggests a binary search to find the smallest `k` where total hours ≤ `h`.

## Approach 1. Brute Force Approach

We iterate through all possible values of `k` from `1` to the `maximum pile size`, calculate the total hours required for each `k`, and return the smallest `k` where total `hours ≤ h`.

```javascript
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
```

**Time Complexity:**

- Let `n` be the number of piles and `M` be the maximum pile size (`max(piles)`).
- For each `k` from 1 to `M`, we iterate through `n` piles to compute total hours.
- Total: `O(M * n)`.

**Space Complexity:**

- O(1) (only using a few variables).

**Issues:**

- Inefficient for large `max(piles)` (e.g., 10^9).
- Unnecessary to check every `k` due to the monotonic nature of the problem.

## Approach 2. Binary Search Approach (Optimal)

Since the feasibility of `k` is monotonic (larger `k` always reduces hours), we can use binary search to find the smallest `k` where total `hours ≤ h`.
We search in the range `[1, max(piles)]`.

```javascript
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
```

**Time Complexity:**

- Binary search range is `[1, max(piles)]`, so there are `O(log M)` iterations, where `M = max(piles)`.
- For each `k`, we iterate through `n` piles to compute total hours.
- Total: `O(n * log M)`.

**Space Complexity:** `O(1)` (only using a few variables).

**Why Optimal?:**

- Binary search reduces the search space logarithmically, making it much faster than brute force for large `max(piles)`.
- Leverages the monotonic property to efficiently narrow down to the smallest valid `k`.
