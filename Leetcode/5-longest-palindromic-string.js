/*** @param {string} s* @return {string}*/
var longestPalindrome = function (s) {
  const n = s.length;
  let lmin, rmax;
  let max = 0;
  let l, r;
  for (let i = 0; i < n; i++) {
    l = i;
    r = i;
    // for odd number of values
    while (l >= 0 && r < n) {
      if (s[l] === s[r]) {
        if (max < r - l + 1) {
          lmin = l;
          rmax = r;
          max = rmax - lmin;
        }
        l--;
        r++;
      } else {
        break;
      }
    }
    // for even number values
    l = i;
    r = i + 1;
    while (l >= 0 && r < n) {
      if (s[l] === s[r]) {
        if (max < r - l + 1) {
          lmin = l;
          rmax = r;
          max = rmax - lmin;
        }
        l--;
        r++;
      } else {
        break;
      }
    }
  }
  return s.substring(lmin, rmax + 1);
};

longestPalindrome('baac');
longestPalindrome('aaaaaaa');
