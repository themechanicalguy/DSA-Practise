const getDigit = (num, i) => {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
};

const digitCount = (num) => {
  if (num === 0) return 1;
  return Math.floor(Math.log10(num)) + 1;
};

const maxDigitCount = (nums) => {
  let maxDigit = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigit = Math.max(maxDigit, digitCount(nums[i]));
  }
  return maxDigit;
};

const radixSort = (nums) => {
  const maxDigit = maxDigitCount(nums);
  for (let k = 0; k < maxDigit; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < nums.length; i++) {
      const bucketIndex = getDigit(nums[i], k);
      digitBuckets[bucketIndex].push(nums[i]);
    }
    nums = [].concat(...digitBuckets);
    // let j = 0;
    // for (let i =0; i< digitBuckets.length; i++) {

    // }
  }
  return nums;
};
// console.log(digitCount(1));
console.log(radixSort([10, 1, 200, 20, 2000, 23]));
