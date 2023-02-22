class Solution {
  findMidSum(ar1, ar2, n) {
    //code here
    console.log(ar1, ar2);
    if (n === 1) return ar1[0] + ar2[0];
    if (n === 2) return Math.max(ar1[0], ar2[0]) + Math.min(ar1[1], ar2[1]);

    const ind = parseInt(n / 2);
    const mid1 = ar1[ind];
    const mid2 = ar2[ind];

    let offset = 1;
    if (n % 2 === 0) offset = 0;

    if (mid1 > mid2)
      return this.findMidSum(
        ar1.slice(ind, n),
        ar2.slice(0, ind + offset),
        ind + offset
      );
    else if (mid1 < mid2)
      return this.findMidSum(
        ar1.slice(0, ind + offset),
        ar2.slice(ind + (offset - 1), n),
        ind + offset
      );
    else return mid1 + mid2;
  }
}

const n = 12;
const A = [5, 10, 12, 16, 17, 18, 22, 24, 27, 29, 29, 29];
const B = [5, 7, 9, 10, 10, 13, 16, 18, 20, 22, 26, 29];
const val = new Solution();
console.log(val.findMidSum(A, B, n), 'template');
