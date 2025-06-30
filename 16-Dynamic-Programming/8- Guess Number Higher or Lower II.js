//LC-375  Guess Number Higher or Lower II
var getMoneyAmount = function (n) {
  const solve = (start, end) => {
    if (start >= end) return 0;
    let ans = Infinity;
    for (let i = start; i <= end; i++) {
      let temp = Math.max(solve(start, i - 1), solve(i + 1, end));
      ans = Math.min(ans, i + temp);
    }
    return ans;
  };
  return solve(1, n);
};

var getMoneyAmountMemo = function (n) {
  // const dp = Array.from({length:n+1},()=> new Array(n+1)).fill(-1);
  const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(-1));
  const solve = (start, end) => {
    if (start >= end) return 0;
    if (dp[start][end] !== -1) return dp[start][end];
    let ans = Infinity;
    for (let i = start; i <= end; i++) {
      let temp = Math.max(solve(start, i - 1), solve(i + 1, end));
      ans = Math.min(ans, i + temp);
    }
    return (dp[start][end] = ans);
  };
  return solve(1, n);
};

getMoneyAmountMemo(3);
