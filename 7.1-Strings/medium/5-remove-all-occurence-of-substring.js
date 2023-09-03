/**
 * @param {string} s
 * @param {string} part
 * @return {string}
 */
var removeOccurrences = function (s, part) {
  // edge - s > part
  // create a res  - "dabcbabcbc" / dab
  let res = "";
  let i = 0,
    j = 0;
  while (i < s.length) {
    if (s[i] === part[j]) {
      i++;
      j++;
      if (j === part.length - 1) j = 0;
    } else {
      res += s[i];
      i++;
      j = 0;
    }
  }
  // 1- start 2 pointer from both strings // i=4 j=2
  //2- loop over s //while(i<s.length)
  //  check s[i] === part[j] //T
  //      i++, j++
  //  else
  //  res += s[i]
  //     i++, j=0
  return res;
};

//didn't workout on 1st
/**
 * @param {string} s
 * @param {string} part
 * @return {string}
 */
var removeOccurrences = function (s, part) {
  let index = s.indexOf(part);
  while (index !== -1) {
    s = s.substring(0, index) + s.substring(index + part.length);
    index = s.indexOf(part);
  }
  return s;
};
