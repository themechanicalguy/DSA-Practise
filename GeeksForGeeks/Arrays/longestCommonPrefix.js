class Solution {
  longestCommonPrefix(arr, n) {
    //code here
    let match = arr[0];

    for (let i = 0; i < n; i++) {
      let tempMatch = '';
      for (let j = 0; j < match.length; j++) {
        if (arr[i][j] === match[j]) {
          tempMatch = tempMatch + match[j];
        } else {
          break;
        }
      }
      if (!tempMatch) return -1;
      match = tempMatch;
    }
    return match;
  }
}
