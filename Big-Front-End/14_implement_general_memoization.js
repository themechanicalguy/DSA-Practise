/**
 * @param {Function} func
 * @param {(args:[]) => string }  [resolver] - cache key generator
 */
function memo(func, resolver) {
  // your code here
  let result;
  const cache = new Map();

  function memoize(...args) {
    const cachedVal =
      typeof resolver === 'function' ? resolver(...args) : args.join('_');

    if (cache.has(cachedVal)) {
      return cache.get(cachedVal);
    }

    result = func.apply(this, args);
    cache.set(cachedVal, result);

    return result;
  }
  return memoize;
}

function funcThis(b) {
  return `${this.a}_${b}`;
}
const memoed = memo(funcThis);
const a = {
  a: 1,
  memoed,
};
console.log(a.memoed(2)); // 1_2
