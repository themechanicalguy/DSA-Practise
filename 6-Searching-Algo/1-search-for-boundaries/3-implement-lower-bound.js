//https://www.geeksforgeeks.org/problems/floor-in-a-sorted-array-1587115620/1
// Given a sorted array arr[] of size N and an integer x, find the floor of x in arr[].
// The floor of x is the largest element in arr[] smaller than or equal to x.
// If the floor doesn't exist, return -1.
// Input:
// N = 5
// arr[] = {1, 2, 8, 10, 10}
// x = 12
// Output: 10

// Approach 1: Linear Search
function findFloorLinear(arr, x) {
  let floorIndex = -1; // Initialize result as -1 (no floor found)

  // Iterate through array to find largest element <= x
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= x) {
      floorIndex = i; // Update floorIndex whenever we find element <= x
    } else {
      break; // Since array is sorted, we can break when we exceed x
    }
  }

  return floorIndex;
}

// Approach 2: Binary Search (Iterative)
function findFloorBinaryIterative(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  let floorIndex = -1; // Initialize result

  // Binary search to find floor
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] <= x) {
      floorIndex = mid; // Potential floor found, but look for larger one
      left = mid + 1; // Search in right half
    } else {
      right = mid - 1; // Search in left half
    }
  }

  return floorIndex;
}

// Approach 3: Binary Search (Recursive)
function findFloorBinaryRecursive(
  arr,
  x,
  left = 0,
  right = arr.length - 1,
  floorIndex = -1
) {
  // Base case: if search space is exhausted
  if (left > right) {
    return floorIndex;
  }

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] <= x) {
    // Current element is a potential floor
    // Recursively search right half for larger possible floor
    return findFloorBinaryRecursive(arr, x, mid + 1, right, mid);
  } else {
    // Search in left half
    return findFloorBinaryRecursive(arr, x, left, mid - 1, floorIndex);
  }
}

// Approach 4: Using JavaScript Built-in Methods
function findFloorBuiltIn(arr, x) {
  // Filter elements <= x and get last index
  const validElements = arr.filter((num) => num <= x);
  return validElements.length > 0
    ? arr.lastIndexOf(validElements[validElements.length - 1])
    : -1;
}

// Test the solutions
const testArray = [1, 2, 4, 6, 8, 10];
const testValues = [5, 0, 11];

testValues.forEach((x) => {
  console.log(`Floor of ${x}:`);
  console.log("Linear Search:", findFloorLinear(testArray, x));
  console.log("Binary Iterative:", findFloorBinaryIterative(testArray, x));
  console.log("Binary Recursive:", findFloorBinaryRecursive(testArray, x));
  console.log("Built-in Method:", findFloorBuiltIn(testArray, x));
  console.log("---");
});
