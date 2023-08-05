// Array.prototype.myMap = function (cb) {
//   // your code here
//   const mappedArray = [];
//   for (let i = 0; i < this.length; i++) {
//     const args = [this[i], i, this];
//     mappedArray.push(cb(...args));
//   }
//   return mappedArray;
// };

// Array.prototype.myMap = function (cb, thisObj) {
//   // your code here
//   const mappedArray = [];
//   for (let i = 0; i < this.length; i++) {
//     const args = [this[i], i, this];
//     mappedArray.push(cb.apply(thisObj, args));
//   }
//   return mappedArray;
// };

// Above 2 functions wont work as the empty in the array will not be iterated and pushing the value results in pushing a value into resultArr so we have to map the index directly

Array.prototype.myMap = function (cb, thisObj) {
  // your code here
  const mappedArray = new Array(this.length);
  this.forEach((...args) => {
    // const args = [this[i], i, this]
    const i = args[1];

    mappedArray[i] = cb.apply(thisObj, args);
  });
  return mappedArray;
};
const arr = [1, 2, 3, 4, 5];

const callback = function () {
  return this;
};
const result = arr.myMap(callback, 3);
console.log('result', result);
