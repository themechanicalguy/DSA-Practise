/**
 * @param {any} data
 * @return {string}
 */
function detectType(data) {
  // your code here
  if (data === null) return 'null';
  if (typeof data === 'object')
    return (
      data?.prototype?.constructor?.name ??
      data.__proto__.constructor.name.toLowerCase()
    );

  return typeof data;
}

//BEST SOLUTION
function detectType(data) {
  if (data instanceof FileReader) return 'object';
  return Object.prototype.toString
    .call(data)
    .slice(1, -1)
    .split(' ')[1]
    .toLowerCase();
}
