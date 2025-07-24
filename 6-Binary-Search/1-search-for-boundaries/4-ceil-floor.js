//https://www.geeksforgeeks.org/problems/ceil-the-floor2802/1
// Given an unsorted array arr[] of integers and an integer x, find the floor and ceiling of x in arr[].
// Floor of x is the largest element which is smaller than or equal to x. Floor of x doesn’t exist if x is smaller than smallest element of arr[].
// Ceil of x is the smallest element which is greater than or equal to x. Ceil of x doesn’t exist if x is greater than greatest element of arr[].
// Return an array of integers denoting the [floor, ceil]. Return -1 for floor or ceiling if the floor or ceiling is not present.

//Approach 1: Brute Force (Linear Search)
// Time Complexity: O(n)
// Space Complexity: O(1)
/**
 * Finds floor and ceiling of x in an unsorted array using linear search
 * @param {number[]} arr - The input array
 * @param {number} x - The target number
 * @return {number[]} - Array containing [floor, ceil] or -1 if not present
 */
function findFloorAndCeilingLinear(arr, x) {
  let floor = -Infinity; // Initialize floor to smallest possible
  let ceil = Infinity; // Initialize ceil to largest possible

  for (const num of arr) {
    // Update floor if we find a larger number that's still <= x
    if (num <= x && num > floor) {
      floor = num;
    }
    // Update ceil if we find a smaller number that's still >= x
    if (num >= x && num < ceil) {
      ceil = num;
    }
  }

  // Handle cases where floor or ceil wasn't found
  const result = [
    floor === -Infinity ? -1 : floor,
    ceil === Infinity ? -1 : ceil,
  ];

  return result;
}

//Approach 2: Sorting + Binary Search
// Time Complexity: O(n log n) for sorting + O(log n) for binary search
// Space Complexity: O(n) for storing sorted array
// Note: This approach is less efficient than linear search for small arrays
// but is useful for larger datasets where sorting is beneficial.
// The sorting step can be skipped if the array is already sorted.
/**
 * Finds floor and ceiling of x by first sorting then using binary search
 * @param {number[]} arr - The input array
 * @param {number} x - The target number
 * @return {number[]} - Array containing [floor, ceil] or -1 if not present
 */
function findFloorAndCeilingWithSorting(arr, x) {
  if (arr.length === 0) return [-1, -1];

  // Sort the array to enable binary search
  const sortedArr = [...arr].sort((a, b) => a - b);

  let floor = -1;
  let ceil = -1;
  let left = 0;
  let right = sortedArr.length - 1;

  // Binary search to find floor and ceiling
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (sortedArr[mid] === x) {
      // Exact match, both floor and ceil are x
      floor = ceil = x;
      break;
    } else if (sortedArr[mid] < x) {
      // Current element could be floor, search right half
      floor = sortedArr[mid];
      left = mid + 1;
    } else {
      // Current element could be ceil, search left half
      ceil = sortedArr[mid];
      right = mid - 1;
    }
  }

  return [
    floor === -1 && sortedArr[0] > x ? -1 : floor,
    ceil === -1 && sortedArr[sortedArr.length - 1] < x ? -1 : ceil,
  ];
}


const findFloorAndCeilingBrute = (arr, x) => {

    let floor, ceil;
    for (let i=0; i<arr.length; i++) {
      if (arr[i] <= x) {
        floor = arr[i];
      } else {
        break;
      }
    }

    for (let i=0; i<arr.length; i++) {
      if (arr[i] >= x) {
        ceil = arr[i];
        break;
      }
    }
    return [floor, ceil];
}


function findFloorAndCeilingOpti (arr, x) {

  const floorFn =() => {
    let left =0, right=arr.length-1, ans=-1;
    while (left <= right) {
      const mid = Math.floor((left+right)/2);

      if (arr[mid] <= x) {
        left = mid+1;
        ans=mid;
      } else {
        right =mid-1;
      }
    }
    return ans
  }

  const ceilFn = () => {
    let left =0, right=arr.length-1, ans=-1;
    while (left <= right) {
      const mid = Math.floor((left+right)/2);

      if (arr[mid] >= x) {
        ans=mid;
        right =mid-1;
      } else {
        left = mid+1;
      }
    }
    return ans
  }

  return [arr[floorFn()], arr[ceilFn()]];
}

const x = 6, arr =[3, 4, 4, 7, 8, 10];
console.log("Ans for x=6 : ", findFloorAndCeilingOpti(arr, x));
console.log("Ans for x=8 : ", findFloorAndCeilingOpti(arr, 8));