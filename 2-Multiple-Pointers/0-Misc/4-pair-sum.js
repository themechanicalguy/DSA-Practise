// Given a sorted array, find the no. of pairs which have a sum of K
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
  // [1,1,1,1], 2
  let map = new Map();
  /**
   {
    1: 3,

   }
   */
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    //0124
    // 2-1 = 1
    let b = k - arr[i]; //1 1 1
    if (map.has(b)) {
      //T
      count += map.get(b); //6
    }
    if (map.has(arr[i])) {
      //FTTT
      map.set(arr[i], map.get(arr[i]) + 1);
    } else {
      map.set(arr[i], 1);
    }
  }
  return count;
}
// getPairsCount([1, 1, 1, 1], 2);

console.log(getPairsSum([1, 4, 4, 5, 5, 5, 6, 6, 11], 11));

// TRy solving these problem using other approach as well
function getPairsSum(arr, sum) {
  const freqMap = new Map();
  //Store count of all elements in map m
  for (let i = 0; i < arr.length; i++) {
    if (freqMap.has(arr[i])) {
      freqMap.set(arr[i], freqMap.get(arr[i]) + 1);
    } else {
      freqMap.set(arr[i], 1);
    }
  }
  let countTwice = 0;
  //iterate through each element and increment the count(Notice that every pair is counted twice)
  for (let i = 0; i < arr.length; i++) {
    if (freqMap.has(sum - arr[i])) countTwice += freqMap.get(sum - arr[i]);
    // if(arr[i], arr[i]) pair satisfies the condition, then we need to ensure that the count is decreased by one such that the
    // (arr[i],arr[i]) pair is not considered
    if (sum - arr[i] === arr[i]) countTwice--;
  }
  return countTwice / 2;
}
