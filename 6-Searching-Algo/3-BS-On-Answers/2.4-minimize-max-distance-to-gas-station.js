//https://www.geeksforgeeks.org/problems/minimize-max-distance-to-gas-station/1
/*
We have a horizontal number line. On that number line, we have gas stations at positions stations[0], stations[1], ..., stations[n-1], 
where n is the size of the stations array. Now, we add k more gas stations so that d, the maximum distance between adjacent gas stations, is minimized. 
We have to find the smallest possible value of d. Find the answer exactly to 2 decimal places.
Note: stations is in a strictly increasing order.

Example 1:
Input:
n = 10
stations[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
k = 9
Output: 0.50
Explanation: Each of the 9 stations can be added mid way between all the existing adjacent stations.
*/

function minimizeMaxDistance(stations, k) {
  const n = stations.length;

  // Helper function to count how many stations we need for a given distance
  function countStationsNeeded(maxDist) {
    let count = 0;
    // Check each adjacent pair
    for (let i = 1; i < n; i++) {
      // Calculate how many stations needed between current pair
      const gap = stations[i] - stations[i - 1];
      count += Math.floor(gap / maxDist);
    }
    return count;
  }

  // Binary search on the answer
  let left = 0; // Minimum possible distance
  let right = stations[n - 1] - stations[0]; // Maximum possible distance
  let precision = 0.000001; // For 2 decimal places accuracy

  //while (right - left > 1e-6) {
  while (right - left > precision) {
    let mid = (left + right) / 2;

    // Count stations needed for current maximum distance
    let stationsNeeded = countStationsNeeded(mid);

    // If we need more stations than we have, increase the distance
    if (stationsNeeded > k) {
      left = mid;
    }
    // If we need less or equal stations, try to decrease the distance
    else {
      right = mid;
    }
  }

  // Return result rounded to 2 decimal places
  return Number(left.toFixed(2));
}

// Test the function
const stations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const k = 9;
console.log(minimizeMaxDistance(stations, k)); // Output: 0.50

//Approach 2: Priority Queue (Heap) Approach
