# Minimizing Maximum Distance Between Gas Stations

https://www.geeksforgeeks.org/problems/minimize-max-distance-to-gas-station/1

## Problem Statement

We have a horizontal number line. On that number line, we have gas stations at positions `stations[0], stations[1], ..., stations[n-1]`,
where `n` is the size of the stations array.
Now, we add `k` more gas stations so that `d`, the maximum distance between adjacent gas stations, is minimized.
We have to find the smallest possible value of `d`. Find the answer exactly to 2 decimal places.
Note: stations is in a strictly increasing order.

**Example 1:**

- Input: n = `10`, stations[] = `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`,- k = `9`, Output: `0.50`
- Explanation: Each of the 9 stations can be added mid way between all the existing adjacent stations.

**Example 2:**

- Input: n = `10`, stations[] = `[3, 6, 12, 19, 33, 44, 67, 72, 89, 95]` k = `2` Output: `14.00`
- Explanation: Construction of gas stations at 8th(between 72 and 89) and 6th(between 44 and 67) locations.

## Problem Intuition and Approach

The problem involves `minimizing the maximum distance` between adjacent gas stations by strategically placing `k` new stations.

- **Understanding the Objective:** The maximum distance `d` between any two adjacent stations after adding `k` stations is determined by the largest gap between consecutive stations (including new ones). Our goal is to place the new stations such that this largest gap is as small as possible.
- **Key Insight:** For a given maximum distance `d`, we can calculate how many new stations are needed to ensure that every gap between adjacent stations is at most `d`. If we can achieve this with `≤k` stations, then `d` is feasible. The smallest such `d` is our answer.
- **Binary Search on the Answer:** Since `d` is a real number and we need the answer to two decimal places, binary search is an efficient approach to find the smallest `d`. We can search over possible values of `d` and check if it’s possible to place ( k ) or fewer stations to make all gaps at most `d`.
- **Feasibility Check:** For a given `d`, compute the number of new stations needed in each existing gap (between `stations[i]` and `stations[i+1]`).
  If the gap size is `g`, we need `⌊g/d⌋` new stations to break the gap into segments of size at most `d`. Sum these across all gaps and check if the total is `≤k`.
- **Edge Cases**:
  - If `k=0`, no new stations are added, so `d` is the maximum of the current gaps.
  - If the gaps are uneven, we prioritize placing stations in larger gaps to reduce the maximum distance.
  - The answer should be precise to two decimal places, so we handle floating-point precision carefully.

### Approaches

**Binary Search Approach:**

Use binary search to find the smallest `d`. This is optimal for large inputs due to its logarithmic time complexity in searching for ( d ).

```javascript
/**
 * Checks if it's possible to achieve a maximum distance d between adjacent stations with k or fewer new stations.
 * @param {number[]} stations - Array of station positions in increasing order.
 * @param {number} d - Maximum distance to test.
 * @param {number} k - Number of new stations available.
 * @returns {boolean} - True if max distance d is achievable with k or fewer stations.
 */
function canAchieveMaxDist(stations, d, k) {
  let stationsNeeded = 0;
  // Check each gap between consecutive stations
  for (let i = 1; i < stations.length; i++) {
    const gap = stations[i] - stations[i - 1];
    // Number of stations needed to make this gap have segments <= d
    stationsNeeded += Math.floor(gap / d);
  }
  // Return true if we can achieve max distance d with k or fewer stations
  return stationsNeeded <= k;
}

/**
 * Finds the smallest maximum distance between adjacent gas stations after adding k stations.
 * @param {number[]} stations - Array of station positions in increasing order.
 * @param {number} k - Number of new stations to add.
 * @returns {number} - Smallest possible maximum distance, rounded to 2 decimal places.
 */
function findSmallestMaxDist(stations, k) {
  const n = stations.length;

  // Binary search for the smallest possible max distance
  let left = 0; // Minimum possible max distance
  let right = stations[n - 1] - stations[0]; // Maximum possible gap
  let precision = 1e-6; // Precision for binary search
  let result = right;

  while (right - left > precision) {
    let mid = (left + right) / 2;
    if (canAchieveMaxDist(stations, mid, k)) {
      // If feasible, try a smaller max distance
      result = mid;
      right = mid;
    } else {
      // If not feasible, need a larger max distance
      left = mid;
    }
  }

  // Return result rounded to 2 decimal places
  return Number(result.toFixed(2));
}
// Test the function
const stations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const k = 9;
console.log(findSmallestMaxDist(stations, k)); // Output: 0.50
```

**Brute Force**

```javascript
function findSmallestMaxDist(stations, k) {
  // placedCount: will be like a imaginary space where we keep track of how many stations are placed
  const placedCount = new Array(stations.length - 1).fill(0);

  // loop to find out the placedcount, so it can be used later to find the maxDistance
  for (let i = 0; i < k; i++) {
    // find maxi, maxInd
    let maxi = 0,
      maxInd = -1;
    for (let j = 0; j < stations.length - 1; j++) {
      // find diff,
      const diff = (stations[j + 1] - stations[j]) / (placedCount[j] + 1);
      if (maxi < diff) {
        maxi = diff;
        maxInd = j;
      }
    }

    placedCount[maxInd]++;
  }

  // loop to find the maxDisatance from obtained placedCount
  let maxAns = 0;
  for (let j = 0; j < stations.length - 1; j++) {
    // find diff,
    const diff = (stations[j + 1] - stations[j]) / (placedCount[j] + 1);
    maxAns = Math.max(maxAns, diff);
  }
  return maxAns;
}
```
