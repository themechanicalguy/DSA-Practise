/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
  // your code here
  if (target === undefined) throw new Error();
  if (target === null) throw new Error();
  if (typeof target === 'number') return new Number(target);
  if (typeof target === 'boolean') return new Boolean(target);
  if (typeof target === 'string') return new String(target);

  const isWrittable = (obj, key) => {
    const desc = Object.getOwnPropertyDescriptor(obj, key);
    if (!desc) return;
    if (!desc.writable) throw new Error();
    // console.log(Object.getOwnPropertyDescriptor(obj,key),key, obj[key])
  };

  for (let i of Object.values(sources)) {
    if (i === undefined || i === null) continue;
    for (let [key, value] of Object.entries(i)) {
      isWrittable(target, key);
      target[key] = value;
    }
    for (let key of Object.getOwnPropertySymbols(i)) {
      isWrittable(target, key);
      target[key] = i[key];
    }
  }
  return target;
}
