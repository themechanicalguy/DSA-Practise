/**
 * Maximum Ones After Modification -- Interviewbit
 * max consecutive ones ii leetcode -- Premium    
 * Given a binary array arr[] of length N, and an integer K, the task is to find the maximum
    number of consecutive ones after flipping all zero in a subarray of length K.

Examples:
    Input: arr[]= {0, 0, 1, 1, 1, 1, 0, 1, 1, 0}, K = 2
    Output: 7 
    Explanation:
    On taking the subarray [6, 7] and flip zero to one we get 7 consecutive ones.
     

    Input: arr[]= {0, 0, 1, 1, 0, 0, 0, 0}, K = 3
    Output: 5 
    Explanation:
    On taking the subarray [4, 6] and flip zero to one we get 5 consecutive ones. 
 */
function maxConsecutiveOnesWithFlip(arr, K) {
  // Create variables for
  // maxOnes to return,
  let maxOnes = 1;
  // N for length of arr
  let N = arr.length; //10
  // i to point to index
  let i = 0; //1
  // j to flip and unflip zeros
  let j = 0; //
  // flip to control K flips
  let flip = 0; //

  while (i < N) {
    //TTTTTTTTTT
    // flipping the value if arr[i] is 0
    if (arr[i] === 0) {
      //TTFFTFT
      flip++; //4
    }
    // Unfliping 0 if flip exceeds than K
    while (flip > K) {
      //FFFFT
      if (arr[j] === 0) {
        flip--; //3
      }
      j++; //
    }
    // length  of subsegment
    maxOnes = max(maxOnes, i - j + 1); //9
    i++; //9
  }
  return ans;
}

// [0, 0, 1, 1, 1, 1, 0, 1, 1, 0]; K = 3
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
