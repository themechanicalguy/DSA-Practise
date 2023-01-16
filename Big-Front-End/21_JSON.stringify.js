/**
 * @param {any} data
 * @return {string}
 */

// Polyfill to do JSON.stringify
function stringify(data) {
  // your code here
  const unexpectedTypes = [NaN, null, undefined, Infinity];
  function drivenFunc(data, string = '') {
    const type = Object.prototype.toString
      .call(data)
      .slice(1, -1)
      .split(' ')[1]
      .toLowerCase();

    if (type === 'bigint') throw new Error('type mismatch');
    if (unexpectedTypes.includes(data)) return 'null';
    if (type === 'symbol') return 'null';
    if (type === 'number') return `${data}`;
    if (type === 'boolean') return `${data}`;
    if (type === 'string') return `"${data}"`;
    if (type === 'date') return `"${data.toISOString()}"`;

    if (type === 'array') {
      return `[${data.map((dat) => drivenFunc(dat))}]`;
    }

    if (typeof data === 'object') {
      return `{${Object.keys(data)
        .map((key) => {
          if (data[key] === undefined) return '';
          return `"${key}":${drivenFunc(data[key])}`;
        })
        .filter((dat) => dat)}}`;
    }
  }
  return drivenFunc(data);
}

const dat = { a: undefined, b: null, c: NaN };
console.log(stringify(dat));

console.log(JSON.stringify(dat));
