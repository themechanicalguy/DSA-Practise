// Recursive function to divide array and sort
function mergeSort(arr) {
  // Base case: if array has 1 or fewer elements, it's already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Find the middle point to split the array
  const midPoint = Math.floor(arr.length / 2);

  // Split into left and right halves
  const leftHalf = arr.slice(0, midPoint);
  const rightHalf = arr.slice(midPoint);

  // Recursively sort both halves
  const sortedLeft = mergeSort(leftHalf);
  const sortedRight = mergeSort(rightHalf);

  // Merge the sorted halves
  return merge(sortedLeft, sortedRight);
}
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

// Example usage
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
console.log("Recursive Merge Sort:", mergeSort(unsortedArray));
