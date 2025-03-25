const merge = (arr, l, m, r) => {
  const newArr = [];
  let i = 0;
  let j = 0;
  while (i < m - l + 1 && j < r - m) {
    if (arr[i + l] < arr[j + m + 1]) {
      newArr.push(arr[i + l]);
      i++;
    } else {
      newArr.push(arr[j + m + 1]);
      j++;
    }
  }
  while (i < m - l + 1) {
    newArr.push(arr[i + l]);
    i++;
  }
  while (j < r - m) {
    newArr.push(arr[j + m + 1]);
    j++;
  }

  let k = 0;
  while (k < newArr.length) {
    arr[k + l] = newArr[k];
    k++;
  }
  return;
};

const _mergeSort = (arr, left, right) => {
  if (left >= right) return;

  let mid = Math.floor((left + right) / 2);
  _mergeSort(arr, left, mid);
  _mergeSort(arr, mid + 1, right);

  merge(arr, left, mid, right);
};

const mergeSort = (arr) => {
  _mergeSort(arr, 0, arr.length - 1);
  return arr;
};

console.log([4, 3, 2, 1, 9, 8, 5, 7, 6]);
//-----------------------------------------------------------------------------------------------------
// Function to merge two sorted arrays into one sorted array
function merge(leftArray, rightArray) {
  let mergedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare elements from both arrays and merge in sorted order
  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    if (leftArray[leftIndex] <= rightArray[rightIndex]) {
      mergedArray.push(leftArray[leftIndex]);
      leftIndex++;
    } else {
      mergedArray.push(rightArray[rightIndex]);
      rightIndex++;
    }
  }

  // Add remaining elements from leftArray, if any
  while (leftIndex < leftArray.length) {
    mergedArray.push(leftArray[leftIndex]);
    leftIndex++;
  }

  // Add remaining elements from rightArray, if any
  while (rightIndex < rightArray.length) {
    mergedArray.push(rightArray[rightIndex]);
    rightIndex++;
  }

  return mergedArray;
}

// Recursive function to divide array and sort
function mergeSortRecursive(arrayToSort) {
  // Base case: if array has 1 or fewer elements, it's already sorted
  if (arrayToSort.length <= 1) {
    return arrayToSort;
  }

  // Find the middle point to split the array
  const midPoint = Math.floor(arrayToSort.length / 2);

  // Split into left and right halves
  const leftHalf = arrayToSort.slice(0, midPoint);
  const rightHalf = arrayToSort.slice(midPoint);

  // Recursively sort both halves
  const sortedLeft = mergeSortRecursive(leftHalf);
  const sortedRight = mergeSortRecursive(rightHalf);

  // Merge the sorted halves
  return merge(sortedLeft, sortedRight);
}

// Example usage
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
console.log("Recursive Merge Sort:", mergeSortRecursive(unsortedArray));
