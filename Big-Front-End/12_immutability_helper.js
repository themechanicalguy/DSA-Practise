/**
 * @param {any} data
 * @param {Object} command
 */
function isObject(data) {
  if (typeof data === 'object' && data !== null) return true;
  return false;
}
function update(data, command) {
  // your code here
  if ('$push' in command) {
    if (!Array.isArray(data)) {
      throw new Error('notArray');
    }
    return [...data, ...command['$push']];
  }

  if ('$merge' in command) {
    if (!isObject(data)) {
      throw new Error('not object');
    }
    return { ...data, ...command['$merge'] };
  }

  if ('$apply' in command) {
    return command['$apply'](data);
  }

  if ('$set' in command) {
    return command['$set'];
  }

  if (!isObject(data)) {
    throw new Error('not object in recursion');
  }
  const newData = Array.isArray(data) ? [...data] : { ...data };

  for (const key of Object.keys(command)) {
    newData[key] = update(newData[key], command[key]);
  }

  return newData;
}
