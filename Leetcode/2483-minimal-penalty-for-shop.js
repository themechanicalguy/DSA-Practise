/**
 * You are given the customer visit log of a shop represented by a 0-indexed string customers consisting only of characters 'N' and 'Y':

if the ith character is 'Y', it means that customers come at the ith hour
whereas 'N' indicates that no customers come at the ith hour.
If the shop closes at the jth hour (0 <= j <= n), the penalty is calculated as follows:

For every hour when the shop is open and no customers come, the penalty increases by 1.
For every hour when the shop is closed and customers come, the penalty increases by 1.
Return the earliest hour at which the shop must be closed to incur a minimum penalty.

Note that if a shop closes at the jth hour, it means the shop is closed at the hour j.
 */

/**
 * @param {string} customers
 * @return {number}
 */
var bestClosingTime = function (customers) {
  let curPen = 0;
  let closing = -1;
  let maxPen = 0;

  for (let i = 0; i < customers.length; i++) {
    if (customers[i] === 'N') {
      curPen++;
    } else {
      curPen--;
    }
    if (maxPen > curPen) {
      maxPen = curPen;
      closing = i;
    }
  }
  return closing + 1;
};

bestClosingTime('YN'); // 1
bestClosingTime('YYNY'); // 2
bestClosingTime('NNNNN'); // 0
bestClosingTime('YYYY'); // 4
bestClosingTime('NNNNNYYYY'); // 0
