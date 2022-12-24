// This is a JavaScript coding problem from BFE.dev

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
  // your code here
  return function curried(...args) {
    if (
      args.length >= fn.length &&
      args.slice(0, fn.length).every((arg) => arg !== curry.placeholder)
    ) {
      return fn.call(this, ...args);
    }

    return function (...args2) {
      const filteredArgs = args.map((arg) =>
        arg !== curry.placeholder ? arg : args2.shift()
      );
      return curried(...filteredArgs);
    };
  };
}

curry.placeholder = Symbol();
let _ = curry.placeholder;

const sum = (a, b, c, d) => a + b + c + d;
const curried = curry(sum);

const curr = curried(_, 2, 3);
console.log(curr(1, 4, 3, 1), 'What was it again');
