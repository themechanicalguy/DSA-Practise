/**
 * @param {number} num
 */
function sum(num) {
  // your code here

  const func = function (num1) {
    return num1 ? sum(num1 + num) : num;
  };

  func.valueOf = () => num;

  return func;
}

const sum1 = sum(1);
console.log(sum1(2), 3, 'venkat');

/**
 * @param {number} num
 */
function sum1(num) {
  const res = (num2) => sum1(num + num2);
  res[Symbol.toPrimitive] = (hint) =>
    hint === 'string' ? num.toString() : num;
  return res;
}
