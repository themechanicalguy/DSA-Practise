// LC-1047

/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function (str) {
  // index to loop over
  let i = 0;
  // to store the result
  let ans = [];
  // loop over string
  while (i < str.length) {
    // check if answer is not empty
    if (ans.length > 0) {
      // get ans length to access last char
      let ansLen = ans.length;
      // if ans has a item and that item is equal to str[i], then pop that
      if (ansLen - 1 >= 0 && ans[ansLen - 1] === str[i]) {
        ans.pop();
      }
      // if last item of ans and str[i] are different then push str[i] to ans
      else {
        ans.push(str[i]);
      }
    }
    // if answer is empty directly push the char
    else {
      ans.push(str[i]);
    }
    i++;
  }
  return ans.join("");
};
