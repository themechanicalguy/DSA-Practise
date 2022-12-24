// https://bigfrontend.dev/problem/implement-Array-prototype.flat
// There is already Array.prototype.flat() in JavaScript (ES2019), which reduces the nesting of Array.

// 3. implement Array.prototype.flat()

// Could you manage to implement your own one?

// Here is an example to illustrate

// Recursion
// const flatArray = (arr, res, depth = 1) => {
//   if (!Array.isArray(arr)) return arr;
//   for (let i = 0; i < arr.length; i++) {
//     let temp = arr[i];
//     if (Array.isArray(temp) && depth) {
//       flatArray(temp, res, depth - 1);
//     } else {
//       res.push(temp);
//     }
//   }
// };

// Iterative method
const flatArray = (arr, res, depth = 1) => {
  if (!Array.isArray(arr)) return arr;

  let tempDepth = depth;
  let tempArr = arr;
  let result;
  while (tempDepth > 0) {
    result = [];
    for (let i = 0; i < tempArr.length; i++) {
      let temp = tempArr[i];
      if (Array.isArray(temp) && depth) {
        for (let j = 0; j < temp.length; j++) {
          result.push(temp[j]);
        }
      } else {
        result.push(temp);
      }
    }
    tempArr = result;
    tempDepth--;
  }
  return result;
};

const arr = [1, [2], [3, [4], 'Venkat']];
const result = flatArray(arr, '', 1);

console.log(result);
