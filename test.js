// 0,1,1,2,3,5,8,11,19...n
const res = [0, 1];

function fibonacci(n) {
  //base case
  if (n <= 0) return 0;

  if (n === 1) return 1;

  // recurssive relation
  const item = fibonacci(n - 1) + fibonacci(n - 2);

  res.push(item);
  // console.log(res);
  return item;
}

// console.log(fibonacci(5)); //0 1 1 2 3 5
// console.log(res);
// 0,1,
function fibonacciIterative(n) {
  const res = [0, 1];
  for (let i = 2; i < n; i++) {
    let fib = res[i - 1] + res[i - 2]; //1
    res.push(fib);
  }
  return res;
}

console.log(fibonacciIterative(5));
