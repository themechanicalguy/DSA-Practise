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
