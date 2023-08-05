// String.prototype.isNumber = function () {
//   return !isNaN(parseFloat(this));
// };
// String.prototype.toNumber = function () {
//   return parseFloat(this);
// };

// function repeatString(count, str) {
//   let repeated = '';
//   for (let i = 0; i < count; i++) {
//     repeated += str;
//   }
//   return repeated;
// }

// const uncompressString = (str) => {
//   let i = 0;
//   const arr = [];
//   const strArr = [];
//   let newStr = '';
//   while (i < str.length) {
//     if (str[i].isNumber() && str[i - 1]?.isNumber?.()) {
//       arr[arr.length - 1] = arr[arr.length - 1] * 10 + str[i].toNumber();
//     } else if (str[i].isNumber()) {
//       arr.push(str[i].toNumber());
//     } else if (str[i] === '(') {
//       strArr.push(newStr);
//       newStr = '';
//     } else if (str[i] === ')') {
//       newStr && strArr.push(newStr);
//       newStr = '';
//     } else {
//       newStr += str[i];
//     }
//     i++;
//   }

//   let finStr = '';
//   while (arr.length) {
//     const count = arr.pop();
//     const str = strArr.pop();
//     finStr = repeatString(count, str + finStr);
//   }
//   return finStr;
// };

const isNumeric = (str) => !isNaN(parseFloat(str)) && isFinite(Number(str));

function uncompress(str) {
  const stack = [];

  for (const char of str) {
    if (char !== ')') {
      stack.push(char);
    } else {
      let word = '';
      let count = '';

      // !1. 找字符串 (Find String)
      while (stack.length && stack[stack.length - 1] !== '(')
        word = stack.pop() + word;
      stack.pop();

      // !2.找重复次数 (find the number of repetitions)
      while (stack.length && isNumeric(stack[stack.length - 1]))
        count = stack.pop() + count;
      stack.push(word.repeat(Number(count)));
    }
  }

  return stack.join('');
}

function main() {
  const strin = '3(ab4(abc))';

  const result = uncompress(strin);
  console.log(result);
}

main();
