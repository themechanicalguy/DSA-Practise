/**
 * Max Continuous Series of 1s
 
You are given with an array of 1s and 0s. And you are given with an integer M, which signifies number of flips allowed.
Find the position of zeros which when flipped will produce maximum continuous series of 1s.
For this problem, return the indices of maximum continuous series of 1s in order.
Example:
Input : 
Array = {1 1 0 1 1 0 0 1 1 1 } 
M = 1
Output : 
[0, 1, 2, 3, 4] 
If there are multiple possible solutions, return the sequence which has the minimum start index.

 */
function maxConsecutiveOnesWithFlip(arr, K) {
  // Create variables for
  // maxOnes to return,
  let maxOnes = 1;
  // N for length of arr
  let N = arr.length; //10
  // i to point to index
  let i = 0; //9
  // j to flip and unflip zeros
  let j = 0; //0
  // flip to control K flips
  let flip = 0; //1

  while (i < N) {
    //TTTTTTTTTTF
    // flipping the value if arr[i] is 0
    if (arr[i] === 0) {
      //TTFFFFTFFT
      flip++; //4
    }
    // Unfliping 0 if flip exceeds than K
    while (flip > K) {
      //FFFFFFFFFT
      if (arr[j] === 0) {
        flip--; //3
      }
      j++; //1
    }
    // length  of subsegment
    ans = max(ans, i - j + 1); //9
    i++; //
  }
  return ans;
}
