/** LC-44
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
function isMatching(s, si, p, pi) {
  //base
  if (si === s.length && pi === p.length) return true;
  if (si === s.length && pi < p.length) {
    while (pi < p.length) {
      if (p[pi] !== "*") return false;
      pi++;
    }

    return true;
  }

  //single char matching
  if (s[si] === p[pi] || p[pi] === "?") {
    return isMatching(s, si + 1, p, pi + 1);
  }
  if (p[pi] === "*") {
    //consider * as empty
    let caseA = isMatching(s, si, p, pi + 1);
    //consider * consume 1 character
    let caseB = isMatching(s, si + 1, p, pi);
    return caseA || caseB;
  }

  return false;
}

var isMatch = function (s, p) {
  let si = 0;
  let pi = 0;

  return isMatching(s, si, p, pi);
};

// Optimise using DP
