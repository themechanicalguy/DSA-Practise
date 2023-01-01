// WHAT???
// Currying is a technique in functional programming that performs the transformation of a function with multiple arguments into several functions containing a single argument in a sequence

// WHY??
// Currying is a checking method to make sure that you get everything you need before you proceed.

function curryFunction(fun) {
  return function curried(...args) {
    if (arguments.length >= fun.length) {
      return fun.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sumValues(val1, val2) {
  console.log('sumvalues', val1, val2);
  return val1 + val2;
}

const newFun = curryFunction(sumValues);
console.log(newFun(20), 'function');
console.log(newFun(20)(29), 'function');
