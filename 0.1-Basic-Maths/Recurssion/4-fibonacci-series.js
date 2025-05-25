// Write a function to return 8th fibonacci number
// 0,1,1,2,3,5,8,13,21,34 ==> Output 13

function findFibonacci(N) {
  //base case
  if (N == 0) return 0;
  if (N == 1) return 1;
  //recursive relation
  //f(n) = f(n-1) + f(n-2);
  return findFibonacci(N - 1) + findFibonacci(N - 2);
}

let res = findFibonacci(8);
console.log(res);

//print fibonacci upto a number------------------------------------

function printFibonacci(n) {
  let num = "";
  function fibonacci(n) {
    //base cases
    if (n === 0) return 0;
    if (n === 1) return 1;
    //recurssive relation
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  for (let i = 0; i < n; i++) {
    num += fibonacci(i) + " ";
  }
  return num;
}
printFibonacci(10);

/**
 * @param {number} n
 * @return {number}
 *----------------------------------------*/
var fib = function (n) {
  let memo = new Array(n);
  if (n < 2) return n;
  if (memo[n]) return memo[n];
  return (memo[n] = fib(n - 1) + fib(n - 2));
};
