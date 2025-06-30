// Write a function to find factorial of a number using recurssion
/**
 * 5! = 5 * 4 * 3 * 2 * 1
 * 5! = 5 * 4!
 * recurrence relation = f(n) = n * f(n-1)
 * Base Case = N == 0, return 1;
 */

function fact(N) {
  //base case
  if (N === 0) return 1;
  //recurrence relation
  let factorial = N * fact(N - 1);
  return factorial;
}

const res = fact(5);
console.log(res);
