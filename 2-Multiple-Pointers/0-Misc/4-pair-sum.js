// Given an array, find the no. of pairs which have a sum of K
// I = [1,4,4,5,5,5,6,6,11], K=11
// O = 6

// Naive Approach: O(n2)
function naivePairSum(arr, sum) {
  let count = 0;
  // Consider all possible pairs and check their sums
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) if (arr[i] + arr[j] == sum) count++;

  return count;
}

// Count pairs with given sum using Hashing in Single loop
// TC-O(N), SC-O(N)

function getPairsCount(arr, k) {
  let map = new Map();
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    let b = k - arr[i];
    if (map.has(b)) {
      count += map.get(b);
    }
    if (map.has(arr[i])) {
      map.set(arr[i], map.get(arr[i]) + 1);
    } else {
      map.set(arr[i], 1);
    }
  }
  return count;
}
getPairsCount([1, 1, 1, 1], 2);

console.log(
  getPairsCount([10, 12, 10, 15, -1, 7, 6, 5, 5, 5, 5, 5, 4, 2, 1, 1, 1], 10)
);
