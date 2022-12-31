const jump = function (nums) {
  let count = 0;
  let i = 0;
  if (nums.length === 1) return 0;
  while (i < nums.length) {
    const range = nums[i] + i;

    if (i === range) return -1;
    if (range >= nums.length - 1) return count + 1;

    let best = i;
    let newI = i;
    for (let j = 1; j <= nums[i]; j++) {
      const toCompare = i + nums[i + j] - (2 - j - 1);
      if (toCompare > best) {
        newI = i + j;
        best = toCompare;
        console.log(toCompare, newI, i, j);
      }
    }
    i = newI;
    // console.log('next index', i);
    count++;
  }
  return count;
};

// const result = jump([2, 3, 0, 1, 4]);
// // const result = jump([2, 3, 1]);

// console.log(result, 'result');

//OPTIMIZED
const jumpOP = function (N) {
  let len = N.length - 1,
    curr = -1,
    next = 0,
    jumps = 0;
  for (let i = 0; next < len; i++) {
    if (i > curr) {
      jumps++;
      curr = next;
    }
    next = Math.max(next, N[i] + i);
  }
  return jumps;
};

const result = jumpOP([2, 3, 0, 1, 4, 8]);
// const result = jump([2, 3, 1]);

console.log(result, 'result');
