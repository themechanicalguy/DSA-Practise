const pairSum = (arr, sum) => {
  console.log(arr.sort((a, b) => a - b));
  let left = 0;
  let right = arr.length - 1;
  let pair = 0;

  while (left < right) {
    if (arr[left] + arr[right] === sum) {
      let l = 1,
        r = 1;
      left++;
      right--;
      while (arr[left] === arr[left + 1]) {
        left++;
        l++;
      }
      while (arr[right] === arr[right - 1]) {
        right--;
        r++;
      }
      // right--;
      pair = l * r + pair;
    } else if (arr[left] + arr[right] < sum) {
      left++;
    } else {
      right--;
    }
  }
  return pair;
};

console.log(
  pairSum([10, 12, 10, 15, -1, 7, 6, 5, 5, 5, 5, 5, 4, 2, 1, 1, 1], 10)
);
