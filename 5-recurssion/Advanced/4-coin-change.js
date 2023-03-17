// Given an array of size n and n distinct positive elements. we have been given some target, find the minimum number
// of elements required to reach target

function solve(arr, target) {
  //base cases
  if (target === 0) {
    return 0;
  }

  if (target < 0) {
    return Infinity;
  }
  let mini = Infinity;
  for (let i = 0; i < arr.length; i++) {
    let ans = solve(arr, target - arr[i]);
    if (ans !== Infinity) {
      mini = Math.min(ans + 1, mini);
      // ans = ans +1;
    }
  }
  return mini;
}

solve([1, 2, 5], 5);
