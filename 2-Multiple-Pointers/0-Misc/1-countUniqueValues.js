/**
 * write a function called countUniqueValues, which accepts a sorted array, and count the unique values in the array.
   There can be negative numbers in the array, but it will always be sorted.
 */
// Naive Approach -- not working
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

// [1, 1, 1, 1, 1, 1, 2]
// [0, 1, 2, 3, 4, 5, 6];
//  i=0, j=6 count= 1;
//  i=1 j=2, FFFFT count = 2
//  i=2, j=3 FFFT count = 3
//  i=3 , j=4 FFT count = 4
//  i=4, j=5 FT count = 5
//  i=5, j=6, T count = 6

// console.log(naiveCountUnique([1, 1, 1, 1, 1, 1, 2]));
console.log(naiveCountUnique([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]));

// Using Set O(N) - TC && O(N) SC
function distinctUnique(arr) {
  const unique = new set(...arr);
  return unique;
}

// Using Multiple Pointer

[-3, -2, 0, 3, 4, 5];
[+0, +1, 2, 3, 4, 5];
// i=2, j= 2, sum = -2, count = 5
// i < j T T:
//  i!=j && arr[i] === ar[i+1]  --> i++, count -- , F
//  i!=j && arr[j] === arr[j-1] --> j--, count --; F
// sum = arr[i] + arr[j];
// if sum === 0 --> count--, i++,j--
//  if sum < 0 ==> i++;
// else j--;
