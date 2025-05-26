//LC-136. Single Number
//every elements occurs twice except 1, find that element

// The XOR of two same numbers is 0 (a ^ a = 0).
// The XOR of a number with 0 is the number itself (a ^ 0 = a).
// Since every number appears twice except for one, XORing all numbers together will cancel out the duplicates, leaving only the unique number.
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

Same bits give 0 → A ^ A = 0
Different bits give 1 → 0 ^ 1 = 1 and 1 ^ 0 = 1
XOR with 0 keeps the number unchanged → A ^ 0 = A
XOR is commutative → A ^ B = B ^ A
XOR is associative → (A ^ B) ^ C = A ^ (B ^ C)
This is why XOR is useful in problems like "finding the single number" in an array where every element appears twice except one. 
 */

//Approach 2: Using Hash Map
function singleNumberHash(nums) {
  let map = new Map();

  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  for (let [key, value] of map.entries()) {
    if (value === 1) return key;
  }
}
