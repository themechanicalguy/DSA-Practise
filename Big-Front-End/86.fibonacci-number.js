/**
 * @param {number} n - non-negative integer
 * @return {number}
 */
function fib(n) {
  // your code here
  if (n < 0) return 0;
  if (n < 2) return n;

  let a = 0;
  let b = 1;
  for (let i = 1; i < n; i++) {
    const temp = b + a;
    a = b;
    b = temp;
  }
  return b;
}

console.log(fib(4));
