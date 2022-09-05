/**
 * write a function called countUniqueValues, which accepts a sorted array, and count the unique values in the array.
   There can be negative numbers in the array, but it will always be sorted.
 */
// Naive Approach -- not working
/*
function naiveCountUnique(arr) {
  let count = 1;
  // run 2 loop check if arr[i] != arr[j], then increase count
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length - i; j++) {
      if (arr[i] !== arr[j]) count++;
    }
  }
  //   console.log(count);
  return count;
}
*/
// [1, 1, 1, 1, 1, 1, 2]
// [0, 1, 2, 3, 4, 5, 6];
//  i=0, j=6 count= 1;
//  i=1 j=2, FFFFT count = 2
//  i=2, j=3 FFFT count = 3
//  i=3 , j=4 FFT count = 4
//  i=4, j=5 FT count = 5
//  i=5, j=6, T count = 6

// console.log(naiveCountUnique([1, 1, 1, 1, 1, 1, 2]));
// console.log(naiveCountUnique([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]));

// Using Set O(N) - TC && O(N) SC
/*
function distinctUnique(arr) {
  const unique = new set(...arr).length;
  return unique;
}
*/

// Approach 2:
// Using frequency counter

// Using Multiple Pointer
function countUniqueValues(arr) {
  var countUnique = 0; //0
  for (let j = 1; j < arr.length; j++) {
    //5
    if (arr[countUnique] !== arr[j]) {
      //TFT
      countUnique++; //3
      arr[countUnique] = arr[j];
    }
  }
  return countUnique + 1;
}
// [-1, -1, 0, 1, 1];
console.log(countUniqueValues([-2, -1, -1, 0, 1]));
// [0, 1, 2, 3, 4, 5];
