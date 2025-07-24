//LC - 1011 Capacity To Ship Packages Within D Days

// Problem Statement
// A conveyor belt has packages that must be shipped from one port to another within D days.
// The i-th package on the conveyor belt has a weight of weights[i]. Each day, we can ship packages of a maximum weight of W.
// We can ship packages in batches, but the weight of each batch cannot exceed W.
// We need to find the least weight capacity of the ship that will result in all the packages being shipped within D days.
// Return the least weight capacity of the ship that will result in all the packages being shipped within D days.
// Example 1:
// Input: weights = [1,2,3,4,5,6,7,8,9,10], D = 5
// Output: 15
// Explanation: A ship with a capacity of 15 can ship the packages in 5 days.
// Day 1: 1, 2, 3, 4, 5
// Day 2: 6, 7
// Day 3: 8
// Day 4: 9
// Day 5: 10

//Approach 1: Linear Search (Brute Force)

/**
 * Helper function to calculate days needed for a given capacity
 * @param {number[]} weights - Array of package weights
 * @param {number} capacity - Current ship capacity to test
 * @return {number} - Days needed to ship all packages
 */
function calculateDaysNeeded(weights, capacity) {
  let daysNeeded = 1;
  let currentLoad = 0;

  for (const currentWeight of weights) {
    if (currentLoad + currentWeight > capacity) {
      // Need a new day for this package
      daysNeeded++;
      currentLoad = currentWeight;
    } else {
      // Add to current day's load
      currentLoad += currentWeight;
    }
  }

  return daysNeeded;
}

/**
 * Finds the least ship capacity using linear search (not optimal for large inputs)
 * @param {number[]} weights - Array of package weights
 * @param {number} days - Maximum allowed shipping days
 * @return {number} - Minimum required ship capacity
 */
function shipWithinDaysLinear(weights, days) {
  // Start with the minimum possible capacity (max single package)
  let capacity = Math.max(...weights);

  // Keep increasing capacity until we find one that works
  while (true) {
    const daysNeeded = calculateDaysNeeded(weights, capacity);
    if (daysNeeded <= days) {
      return capacity;
    }

    capacity++;
  }
}

/**
 * Finds the least ship capacity to ship all packages within given days using binary search
 * @param {number[]} weights - Array of package weights
 * @param {number} days - Maximum allowed shipping days
 * @return {number} - Minimum required ship capacity
 */
function shipWithinDays(weights, days) {
  // The minimum possible capacity is the maximum weight of any single package
  let minCapacity = Math.max(...weights);
  // The maximum possible capacity is the sum of all weights (ship everything in one day)
  let maxCapacity = weights.reduce((sum, weight) => sum + weight, 0);

  // Binary search between min and max capacity
  while (minCapacity <= maxCapacity) {
    const midCapacity = Math.floor((minCapacity + maxCapacity) / 2);
    const daysNeeded = calculateDaysNeeded(weights, midCapacity);

    if (daysNeeded > days) {
      // Need more capacity to reduce days
      minCapacity = midCapacity + 1;
    } else {
      // Try to find a smaller capacity that still works
      maxCapacity = midCapacity - 1;
    }
  }

  return minCapacity;
}
