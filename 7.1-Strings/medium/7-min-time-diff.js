/** LC- 539
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {
  let minutes = [];
  //step -1 - convert hours to minutes
  for (let item of timePoints) {
    // if(item === '00:00'){
    //     item = '12:00';
    // }
    let [hours, min] = item.split(":");
    let total = +hours * 60 + +min;
    minutes.push(total);
  }
  let m = Infinity;

  // step - 2 Sort
  minutes.sort((a, b) => a - b);

  //step - 3 compare using 2 pointers
  for (let i = 1; i < minutes.length; i++) {
    let diff = minutes[i] - minutes[i - 1];
    m = Math.min(diff, m);
  }

  // last difference - case 00:00 -- the main edge case --vvii
  let lastDiff = minutes[0] + 1440 - minutes[minutes.length - 1];
  m = Math.min(m, lastDiff);

  return m;
};
