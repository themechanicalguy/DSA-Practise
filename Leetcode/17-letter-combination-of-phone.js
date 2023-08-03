/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits == '') {
    return [];
  }
  let table = [
    '0',
    '1',
    'abc',
    'def',
    'ghi',
    'jkl',
    'mno',
    'pqrs',
    'tuv',
    'wxyz',
  ];

  let res = [];
  let que = [''];

  while (que.length > 0) {
    let str = que[0];
    que.shift();

    if (str.length == digits.length) {
      res.push(str); // if all digits are replaced with char push to result
    } else {
      //             get the current number from the digits i.e if str.length = 2 , digits =123 s= 3
      let s = Number(digits.charAt(str.length));
      let val = table[s]; // get char from the table i.e def for s =3

      for (let i = 0; i < val.length; i++) {
        que.push(str + val.charAt(i));
      }
    }
  }

  return res;
};

letterCombinations('4356');
