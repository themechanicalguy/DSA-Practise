function palindrome(str) {
  let start = 0;
  let end = str.length;
  while (start < end) {
    if (start !== end) return false;
    start++;
    end--;
  }
  return true;
}
