

// This is a JavaScript coding problem from BFE.dev 

/*
 type IsBad = (version: number) => boolean
 */

/**
 * @param {IsBad} isBad 
 */
function firstBadVersion(isBad) {
	// firstBadVersion receive a check function isBad
  // and should return a closure which accepts a version number(integer)
  let found = -1;
  return (version) => {

    let l = 0, r = version;
    while (l <= r) {
      const m = Math.floor((l+r) / 2);
      if (isBad(m)) {
        found = m;
        r = m - 1;
      } else {
        l = m + 1;
      }
    }
    return found;
    // write your code to return the first bad version
    // if none found, return -1
  }

}
  firstBadVersion((i) => i >= 4)(4)



