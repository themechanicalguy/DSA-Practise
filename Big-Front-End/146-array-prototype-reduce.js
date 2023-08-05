// Array.prototype.myReduce = function (cb, initialValue) {
//   // your code here
//   let arr = this;
//   if (initialValue === undefined) [initialValue, ...arr] = this;
//   arr.forEach((...args) => {
//     initialValue = cb.apply(arr, [initialValue, ...args]);
//   });
//   return initialValue;
// };

Array.prototype.myReduce = function (...args: any[]) {
  const hasInitialValue = args.length > 1;
  if (!hasInitialValue && this.length === 0) {
    throw new Error();
  }

  let result = hasInitialValue ? args[1] : this[0];

  for (let i = hasInitialValue ? 0 : 1; i < this.length; i++) {
    result = args[0](result, this[i], i, this);
  }

  return result;
};

const arr = [1, 2, 3, 4, 5, 6].reverse();
const reducer = (a, b, c, d) => {
  if (Array.isArray(a)) {
    a.push([b, c, d]);
    return a;
  } else {
    return [b, c, d];
  }
};
console.log(arr.myReduce(reducer, []));
console.log(arr.reduce(reducer, []));
console.log(arr.myReduce(reducer));
console.log(arr.reduce(reducer));
