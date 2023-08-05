/**
 * @param {string} str
 * @return {string}
 */
function longestUniqueSubstr(str) {
  // your code here
  // Use 2 pointer approach
  let i = 0,
    temp = [];
  let curStr = '';
  let maxWidth = 0;
  while (i < str.length) {
    while (temp.includes(str[i])) {
      temp.shift();
    }
    temp.push(str[i]);
    if (maxWidth < temp.length) {
      maxWidth = temp.length;
      curStr = temp.join('');
    }
    i++;
  }
  return curStr;
}

function longestUniqueSubstrv2(str) {
  let buffer = Array(128).fill(0);
  let l = 0;
  let r = 0;
  let max = [0, 0];

  while (r < str.length) {
    const idx = str.charCodeAt(r);
    buffer[idx] += 1;

    while (buffer[idx] > 1) {
      const left = str.charCodeAt(l);
      buffer[left] -= 1;
      l += 1;
    }

    if (r - l > max[1]) {
      max = [l, r - l];
    }

    r += 1;
  }

  return str.substr(max[0], max[1] + 1);
}

console.log(longestUniqueSubstr('abcabc'));
