/**
 DEFINE:
 * Creating Pointer or values that corresponds to an index or position and
   move towards the beginning, end or middle based on a certain condn.
 * You can use it on some sort of linear structure, like an array, string or a linked list, 
   to search for a pair of values, or searching for something that meets a condition. 
 * You use two reference points in the linear structure, and you work toward the middle.

 * Advantage - Very efficient for solving problems with minimal time complexity

   Big O: Time Complexity O(n), Space Complexity O(1)
   
 * While making Pointer consider the following points
 1 - What is the Physical Significance of the pointer?
    It means What does the Pointer represent
 2- How to initialize the pointer ?
    What will be the start and endpoint of the pointers
 3- How to Move the Pointer ?
 4- When to Stop ?

 EXAMPLE: Write a function called sumZero which accepts a sorted array of integers. 
 The function should find the first pair, where the sum is 0. 
 Return an array that includes both values that sum to zero or undefined if a pair does not exist. 
 */
// Naive Approach
function naiveSumZero(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
}

// console.log(naiveSumZero([-3, -2, -1, 0, 1, 2, 3]));

// Refactored
function sumZero(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    let sum = arr[start] + arr[end];
    if (sum === 0) {
      return [arr[start], arr[end]];
    } else if (sum > 0) {
      end--;
    } else {
      start++;
    }
  }
  return -1;
}

console.log(sumZero([-3, -2, -1, 0, 1, 2, 3]));
