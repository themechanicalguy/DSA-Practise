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
