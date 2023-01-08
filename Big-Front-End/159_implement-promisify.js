/**
 * @param {(...args) => void} func
 * @returns {(...args) => Promise<any}
 */
function promisify(func) {
  // your code here

  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }

      args.push(callback);
      func.apply(this, args);
    });
  };
}
