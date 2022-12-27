// One of the differences between null and undefined is how they are treated differently in JSON.stringify().

const undefinedToNull = (arg) => {
  if (arg === undefined || arg === null) return null;
  if (Array.isArray(arg)) arg.map(undefinedToNull);
  if (typeof arg === 'object') {
    return Object.keys(arg).reduce((acc, value) => {
      return { ...acc, [value]: undefinedToNull(arg[value]) };
    }, {});
  }
  return arg;
};
