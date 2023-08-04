/** Author: Venkat
 * Author sir where is the question or problem description
 */
function minLengthSubArray(arr) {
  let max = arr[0];
  let min = arr[0];

  let minGap = 0,
    globalGap = Infinity,
    iMin = -1,
    iMax = -1;

  arr.forEach((val) => {
    max = val > max ? max : val;
    min = val < min ? min : val;
  });

  if (max == min) return 1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == min) iMin = i;
    if (arr[i] == max) iMax = i;

    if (iMin != -1 && iMax != -1) {
      minGap = Math.abs(iMax - iMin);
      globalGap = Math.min(globalGap, minGap);
    }
  }
  return globalGap + 1;
}

console.log(minLengthSubArray([1, 5, 9, 7, 1, 9, 4]));
