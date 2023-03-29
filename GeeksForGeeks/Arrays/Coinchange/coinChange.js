let count1 = 0;
const coinChange = (arr, N, sum, startIndex = 0, result = [], track = []) => {
  if (sum === 0) {
    result.push(track);
    // count1++;
    return 1;
  }

  if (sum < 0 || startIndex >= N) return 0;

  count1 += coinChange(arr, N, sum - arr[startIndex], startIndex, result, [
    ...track,
    arr[startIndex],
  ]);
  count1 += coinChange(arr, N, sum, startIndex + 1, result, [...track]);
  console.log(count1, 'count1');
  return 0;
};

const arr = [1, 2, 3];
const sum = 4;
const result = [];
coinChange(arr, arr.length, sum, 0, result, []);
console.log(count1, result);

// GFG SOlution --- RECURSION

function count(coins, n, sum) {
  // If sum is 0 then there is 1 solution
  // (do not include any coin)
  if (sum == 0) return 1;

  // If sum is less than 0 then no
  // solution exists
  if (sum < 0) return 0;

  // If there are no coins and sum
  // is greater than 0, then no
  // solution exist
  if (n <= 0) return 0;

  // count is sum of solutions (i)
  // including coins[n-1] (ii) excluding coins[n-1]
  return count(coins, n - 1, sum) + count(coins, n, sum - coins[n - 1]);
}
