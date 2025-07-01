// 941. Valid Mountain Array
// https://leetcode.com/problems/valid-mountain-array/description/

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var validMountainArray = function(arr) {
    let i = 0;
    let foundPeak=false;
    for (;i<arr.length-1; i++) {
        if (arr[i] === arr[i+1]) return false;
        if (!foundPeak && arr[i] > arr[i+1]) {
            foundPeak = true;
        } else if (foundPeak && arr[i] < arr[i+1]) {
            return false;
        }
    }
    if (foundPeak && (arr[arr.length-1] < arr[arr.length-2]) && (arr[0] < arr[1])) return true;
    return false
};

    const validMountainArrayOther = ( arr) => {
      if (arr.length < 3)
        return false;
  
      let l = 0;
      let r = arr.length - 1;
  
      while (l + 1 < arr.length && arr[l] < arr[l + 1])
        ++l;
      while (r > 0 && arr[r] < arr[r - 1])
        --r;
  
      return l > 0 && r < arr.length - 1 && l == r;
    }