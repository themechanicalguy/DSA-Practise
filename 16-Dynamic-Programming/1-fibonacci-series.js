//1-Top down approach

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
  //step-1: Create DP array/obj
  let cache = {};
  //step-2: Observe base cases in above solution and init them in dp obj here
  cache[0] = 0;
  cache[1] = 1;
  //step-3: In bottom up approach we start from n=0 to n, so start loop from 1 to n(for loop kahn se kahn tak chalega)
  // as 1 is already considered above so starting from 2
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
