class Solution {
  minJumps(arr, n) {
    //code here

    let jumpCount = 0;
    let nextMove = 0;
    let nextJump = 0;

    for (let i = 0; i < n - 1; i++) {
      // find next maximum of jumpCount from jumpCOunt and currPosVal + i
      nextMove = Math.max(nextMove, i + arr[i]);
      if (nextMove === i) return -1;
      if (nextJump === i) {
        nextJump = nextMove;
        jumpCount++;
      }
    }
    return jumpCount;
  }
}
