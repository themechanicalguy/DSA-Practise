class Solution {
  findSwapValues(A, n, B, m) {
    //code here
    const sumA = A.reduce((acc, val) => acc + val);
    const sumB = B.reduce((acc, val) => acc + val);
    const difference = (sumA - sumB) / 2;

    A.sort((a, b) => a - b);
    B.sort((a, b) => a - b);

    let i = 0,
      j = 0;
    while (i < n && j < m) {
      const curDiff = A[i] - B[j];
      if (curDiff === difference) return 1;
      else if (curDiff < difference) i++;
      else j++;
    }
    return -1;
  }
}

const val = new Solution();
const A = [4, 1, 2, 1, 1, 2];
const B = [3, 6, 3, 3];

const solution = val.findSwapValues(A, A.length, B, B.length);

console.log(solution);
