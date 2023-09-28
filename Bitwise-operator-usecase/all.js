//1- every elements occurs twice except 1, find that element

function uniqueElement(arr) {
  let ans = 0;
  for (let i of arr) {
    ans = ans ^ i;
  }
  return ans;
}
console.log(uniqueElement([1, 2, 4, 2, 1, 3, 6, 5, 5, 6, 4]));

/**
 TRUTH TABLE OF XOR
 a  b a^b
 0  0 0
 0  1 1
 1  0 1
 0  0 0
 */

//2- Count no of set bits in a number
//set bits means number of 1 in a binary series on numbers

function setBits(n) {
  let count = 0;
  while (n) {
    if ((n & 1) === 1) count++;
    n = n >> 1;
  }
  return count;
}
console.log(setBits(3));

// 3- Given a number n and a value k. From the right, set the kth bit in the binary
// representation of n.The position of LSB(or last bit) is 0, second last bit is 1 and
// so on.Also, 0 <= k < x, where x is the number of bits in the binary representation of n.

// function to set the kth bit
function setKthBit(n, k) {
  // kth bit of n is being set
  // by this operation
  return (1 << k) | n;
}

let n = 10,
  k = 2;
document.write("Kth bit set number = " + setKthBit(n, k));
