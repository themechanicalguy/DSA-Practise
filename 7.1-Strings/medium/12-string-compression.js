//LC-443
/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (s) {
  let index = 0,
    count = 1;
  let prev = s[0];
  for (let i = 1; i < s.length; i++) {
    if (s[i] === prev) count++;
    else {
      s[index++] = prev;
      if (count > 1 && count < 10) {
        s[index++] = String(count);
      } else if (count >= 10) {
        let temp = String(count).split("");
        temp.forEach((item) => {
          s[index++] = String(item);
        });
      }
      prev = s[i];
      count = 1;
    }
  }
  s[index++] = prev;
  if (count > 1 && count < 10) {
    s[index++] = String(count);
  } else if (count >= 10) {
    let temp = String(count).split("");
    temp.forEach((item) => {
      s[index++] = String(item);
    });
  }
  return index;
};
