// Count pairs with average present in the same array
/**
 * Input: arr[] = {2, 1, 3} 
Output: 1 
Only valid pair is (1, 3) as (1 + 3) / 2 = 2 is also present in the array.
Input: arr[] = {4, 2, 5, 1, 3, 5} 
Output: 7  
 */

function averageSum(arr) {
  // make a frequency counter map, store all frequency of numbers in tha mp
  const set = new Set();
  for (let i = 0; i < arr.length; i++) {
    if (!set.has(arr[i])) {
      set.add(arr[i], 1);
    }
  }
  // loop through the array and find sum of all emements
  let avg = 0;
  let count = 0;
  // Not the best approach
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      avg = (arr[i] + arr[j]) / 2;
      if (set.has(avg)) {
        count++;
      }
    }
  }
  return count;
}

console.log(averageSum([4, 2, 5, 1, 3, 5]));

// [2, 1, 3];
// [0, 1, 2];
//  O(n2)
