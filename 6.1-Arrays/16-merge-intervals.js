//LC- 56 Merge Intervals
//Given an array of intervals where intervals[i] = [starti, endi],
// merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
// Example 1:
// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

//Approach 1: Sorting-Based Approach (Most Efficient)
// Time complexity: O(nlogn) - Sorting
// Space complexity: O(n) - Merged intervals
//Sort intervals by start time, then merge overlapping ones in a single pass.

/**
 * Merges overlapping intervals using sorting approach.
 * @param {number[][]} intervals - Array of intervals where intervals[i] = [start, end]
 * @return {number[][]} - Array of merged non-overlapping intervals
 */
function mergeIntervalsSort(intervals) {
  // If empty or single interval, return as is
  if (!intervals || intervals.length <= 1) return intervals;

  // Sort intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];
  let currentInterval = intervals[0]; // Start with first interval

  // Iterate through sorted intervals
  for (let i = 1; i < intervals.length; i++) {
    const nextInterval = intervals[i];

    // If current and next overlap, merge by updating end
    if (currentInterval[1] >= nextInterval[0]) {
      currentInterval[1] = Math.max(currentInterval[1], nextInterval[1]);
    } else {
      // No overlap, push current to result and move to next
      merged.push(currentInterval);
      currentInterval = nextInterval;
    }
  }

  // Push the last interval
  merged.push(currentInterval);

  return merged;
}

// Test
const intervals1 = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];
console.log(mergeIntervalsSort(intervals1)); // [[1,6],[8,10],[15,18]]
