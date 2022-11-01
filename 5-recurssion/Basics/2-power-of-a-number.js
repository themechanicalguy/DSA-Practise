//Write a function to print power of a given number.
/**
 * pow(2,4) = 2 * 2 * 2 * 2
 * pow(3,4) = 3 * 3 * 3 * 3
 */

let result = function power(base, pow) {
  //base case
  if (pow == 0) return 1;

  //recurssive relation
  let res = base * power(base, pow - 1);
  return res;
};

console.log(result(3, 3));
