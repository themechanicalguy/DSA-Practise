// Given a string, print the string in reverse order.
// i.e 'abcde' output: 'edcba'

function reverseString(str, start, end) {
  if (start > end) return str;

  // swapping using destructuring assignment
  [str[start], str[end]] = [str[end], str[start]];
  console.log(str[start], str[end]);

  return reverseString(str, start + 1, end - 1);
  // return str;
}

let str = "abcde";
let res = reverseString(str, 0, str.length - 1);
console.log(res);
