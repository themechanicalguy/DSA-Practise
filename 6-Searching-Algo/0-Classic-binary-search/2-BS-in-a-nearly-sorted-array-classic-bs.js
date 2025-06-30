//https://www.geeksforgeeks.org/problems/search-in-an-almost-sorted-array/1
//Given a sorted integer array arr[] consisting of distinct elements, where some elements of the array are moved to either of the adjacent positions, i.e. arr[i] may be present at arr[i-1] or arr[i+1].
// Given an integer target.  You have to return the index ( 0-based ) of the target in the array. If target is not present return -1.

//arr = [10,3,40,20,50,80,70]
//target = 70

/**
 * Binary search adapted for nearly sorted array
 * @param {number[]} arr - Nearly sorted array
 * @param {number} target - Value to search for
 * @return {number} Index of target or -1 if not found
 */
function nearlySorted(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);

    // Check if target is at mid, mid-1, or mid+1
    if (arr[mid] === target) {
      return mid;
    }
    if (mid > left && arr[mid - 1] === target) {
      return mid - 1;
    }
    if (mid < right && arr[mid + 1] === target) {
      return mid + 1;
    }

    // Decide which half to search
    if (arr[mid] > target) {
      // Target could be in left half (accounting for possible displacement)
      right = mid - 2; // We already checked mid-1
    } else {
      // Target could be in right half
      left = mid + 2; // We already checked mid+1
    }
  }

  return -1;
}

// Example usage
console.log(nearlySorted([10, 3, 40, 20, 50, 80, 70], 30)); //2
