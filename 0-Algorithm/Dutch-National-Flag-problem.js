/**
 * Given an array A[] consisting of only 0s, 1s, and 2s. 
 * The task is to write a function that sorts the given array.
 * The functions should put all 0s first, then all 1s and all 2s in last.
This problem is also the same as the famous “Dutch National Flag problem”. 
The problem was proposed by Edsger Dijkstra. The problem is as follows:

Examples:

    Input: {0, 1, 2, 0, 1, 2}
    Output: {0, 0, 1, 1, 2, 2}

    Input: {0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1}
    Output: {0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2}
 */

function sorted(arr) {
  let left = 0; //3
  let mid = 0; //8
  let right = arr.length - 1; //11
  while (mid <= right) {
    //TTTF
    if (arr[mid] === 0) {
      //TT
      // Swap
      [arr[mid], arr[left]] = [arr[left], arr[mid]]; //[0,0]
      left++; //2
      mid++; //9
    } else if (arr[mid] === 2) {
      [(arr[mid], arr[right])] = [arr[right], arr[mid]];
      right = right - 1; //9
    } else {
      mid++; //8
    }
  }
  console.log(left, mid, right);
  return arr;
}

///////[0,0,0,0,0, 1, 1, 1, 1, 1, 2, 2]
sorted([0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1]);
