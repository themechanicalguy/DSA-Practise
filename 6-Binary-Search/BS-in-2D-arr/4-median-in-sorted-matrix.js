//Median in a row-wise sorted Matrix
//https://www.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1

//Approach 1: Flatten and Sort (Brute Force)
/**
 * Finds the median of a row-wise sorted matrix by flattening and sorting
 * Time Complexity: O(mn log mn) where m is rows, n is columns
 * Space Complexity: O(mn) for storing all elements
 */
function matrixMedianFlattenSort(matrix) {
  // Flatten the matrix into a single array
  const flattened = matrix.flat();

  // Sort the flattened array in ascending order
  flattened.sort((a, b) => a - b);

  // Find the middle index (since matrix size is always odd)
  const middleIndex = Math.floor(flattened.length / 2);

  // Return the middle element
  return flattened[middleIndex];
}

const mat = [
  [1, 3, 5],
  [2, 6, 9],
  [3, 6, 9],
];
console.log(matrixMedianFlattenSort(mat)); // Output: 5

/**
 * Finds the median using binary search on the median value
 * Time Complexity: O(m log n log max-min) where m is rows, n is columns
 * Space Complexity: O(1)
 */
function matrixMedianBinarySearch(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const totalElements = rows * cols;
  const medianPosition = Math.floor(totalElements / 2);

  // Find the minimum and maximum in the matrix
  let min = matrix[0][0];
  let max = matrix[0][cols - 1];

  for (let i = 1; i < rows; i++) {
    min = Math.min(min, matrix[i][0]);
    max = Math.max(max, matrix[i][cols - 1]);
  }

  // Binary search between min and max
  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    let count = 0;

    // Count numbers less than or equal to mid in each row
    for (let i = 0; i < rows; i++) {
      let left = 0;
      let right = cols - 1;

      // Binary search in current row
      while (left <= right) {
        const midCol = Math.floor((left + right) / 2);
        if (matrix[i][midCol] <= mid) {
          left = midCol + 1;
        } else {
          right = midCol - 1;
        }
      }
      count += left;
    }

    if (count <= medianPosition) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return min;
}

console.log(matrixMedianBinarySearch(mat)); // Output: 5
