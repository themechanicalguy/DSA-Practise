//find the square root of a number using binary search
function sqrt(num) {
  let start = 0;
  let end = num;
  let target = num;
  let ans = -1;
  while (start <= end) {
    let mid = Math.floor(start + end - start / 2);
    if (mid * mid === target) {
      return mid;
    }
    if (mid * mid > target) {
      end = mid - 1;
    } else {
      ans = mid;
      start = mid + 1;
    }
  }
  return ans;
}

console.log(sqrt(12));
