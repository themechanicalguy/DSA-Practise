/**
 * @param {any} x
 * @return {number}
 */
function mySqrt(x) {
  // your code here
  if (isNaN(x) || x < 0) return NaN;
  if (!isFinite(x) || x == 0) return x;

  let l = 0,
    r = x;
  let appVal;
  let lastVal;

  while (l < r) {
    appVal = parseFloat((l + r) / 2);
    if (parseInt(lastVal) == parseInt(appVal)) return appVal;
    if (appVal * appVal < x) {
      l = appVal;
    } else if (parseInt(appVal * appVal) == x) {
      return parseInt(appVal);
    } else {
      r = appVal;
    }
  }
}

console.log(mySqrt(-1));
