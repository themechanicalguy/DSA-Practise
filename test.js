//kadanes algorithm
const subArraySum = (arr) => {
  const res = [arr[0]];
  let maxSum = arr[0],
    currSum = 0;
  for (let i of arr) {
    currSum = currSum + arr[i];
    // maxSum = Math.max(currSum, maxSum);
    if (currSum > maxSum) {
      maxSum = currSum;
      res.push(i);
    }

    if (currSum < 0) {
      currSum = 0;
      res = [];
    }
  }
  console.log(res);
  // return maxSum;
};

// test commit fro the local space
console.log(subArraySum([3, -2, -2, 2, -1, 3, 4, -5, 4]));
