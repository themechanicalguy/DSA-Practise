//1-Top doen approach

let cache = {};
function fib(n) {
  if (n in cache) return +cache[n];
  else if (n < 2) return +n;
  else {
    cache[n] = fib(n - 1) + fib(n - 2);
    return +cache[n];
  }
}

//2- bottom-up approach

function bottomUpApproach(n) {
  let cache = {};
  cache[0] = 0;
  cache[1] = 1;
  if (n === 0) return cache[0];
  if (n === 1) return cache[1];
  for (let i = 2; i <= n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }

  return cache[n];
}

//3- Space Optimization
function spaceOptSolve(n) {
  let prev2 = 0;
  let prev1 = 1;
  if (n === 0) return prev2;
  if (n === 1) return prev1;
  let curr;
  for (let i = 2; i <= n; i++) {
    curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return curr;
}
