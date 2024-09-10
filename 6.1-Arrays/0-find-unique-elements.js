//every elements occurs twice except 1, find that element

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
