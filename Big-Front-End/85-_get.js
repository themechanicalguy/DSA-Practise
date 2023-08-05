/**
 * @param {object} source
 * @param {string | string[]} path
 * @param {any} [defaultValue]
 * @return {any}
 */
function get(source, path, defaultValue = undefined) {
  let paths;
  if (path.length === 0) return undefined;
  if (Array.isArray(path)) {
    paths = path;
  } else paths = path.replace(/\[/g, '.').replace(/\]/g, '').split('.');
  let value = source;
  for (let i = 0; i < paths.length; i++) {
    value = value?.[paths?.[i]];
    if (!value) return defaultValue;
  }
  return value;
  // your code here
}

/**
 * @param { object } source
 * @param { string | string[] } path
 * @param { any? } defaultValue
 * @returns { any }
 */
function getJSER(source, path, defaultValue = undefined) {
  // 1. normalize the path into array notation
  // 2. get the result layer by layer
  const segs = Array.isArray(path) ? path : path.split(/[\.\[\]]+/g);

  if (segs[segs.length - 1] === '') {
    segs.pop();
  }

  if (segs.length === 0) {
    return defaultValue;
  }

  let result = source;

  while (result && segs.length > 0) {
    let head = segs.shift();
    result = result[head];
  }

  return result === undefined ? defaultValue : result;
}

const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

// get(obj, 'a.b.c') // [1,2,3]
// get(obj, 'a.b.c.0') // 1
// get(obj, 'a.b.c[1]') // 2
// get(obj, ['a', 'b', 'c', '2']) // 3
// console.log(get(obj, 'a.b.c[3]')) // undefined
console.log(get(obj, [])); // undefined
console.log(get(obj, 'a.c', 'bfe')); // 'bfe'
