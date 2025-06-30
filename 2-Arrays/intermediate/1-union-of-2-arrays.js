//print the union of an array with no duplicates
function arrayUnion(arr1, arr2) {
  return [...arr1, ...arr2];
}

console.log(arrayUnion([1, 3, 5, 7, 9], [2, 4, 6, 8]));

//gfg-https://www.geeksforgeeks.org/problems/union-of-two-sorted-arrays-1587115621/1
//Given two sorted arrays a[] and b[], where each array may contain duplicate elements ,
// the task is to return the elements in the union of the two arrays in sorted order.
// Union of two arrays can be defined as the set containing distinct common elements that are present in either of the arrays.

function findUnion(a, b) {
  // your code here

  let rs = [...a, ...b].sort((a, b) => a - b);

  return [...new Set(rs)];
}

function unionSortedArrays(a, b) {
  a.sort((a, b) => a - b);
  b.sort((a, b) => a - b);
  let i = 0,
    j = 0;
  let result = [];

  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      if (result.length === 0 || result[result.length - 1] !== a[i]) {
        result.push(a[i]);
      }
      i++;
    } else if (a[i] > b[j]) {
      if (result.length === 0 || result[result.length - 1] !== b[j]) {
        result.push(b[j]);
      }
      j++;
    } else {
      // a[i] === b[j]
      if (result.length === 0 || result[result.length - 1] !== a[i]) {
        result.push(a[i]);
      }
      i++;
      j++;
    }
  }

  // Add remaining elements of a[]
  while (i < a.length) {
    if (result[result.length - 1] !== a[i]) {
      result.push(a[i]);
    }
    i++;
  }

  // Add remaining elements of b[]
  while (j < b.length) {
    if (result[result.length - 1] !== b[j]) {
      result.push(b[j]);
    }
    j++;
  }

  return result;
}

// Example Usage:
console.log(unionSortedArrays([1, 2, 2, 3, 4], [2, 3, 5, 6]));
// Output: [1, 2, 3, 4, 5, 6]
