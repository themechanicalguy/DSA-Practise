/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  var n = matrix.length;
  var m = (matrix[0] || []).length;
  var ll = 0;
  var rr = n * m - 1;
  var mid = 0;
  var tmp = 0;
  while (ll <= rr) {
    mid = ll + Math.floor((rr - ll) / 2);
    tmp = matrix[Math.floor(mid / m)][mid % m];
    if (tmp === target) {
      return true;
    } else if (tmp > target) {
      rr = mid - 1;
    } else {
      ll = mid + 1;
    }
  }
  return false;
};
