// This is a JavaScript coding problem from BFE.dev

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */
function throttle(func, wait, option = { leading: true, trailing: true }) {
  // your code here
  // let timer = null;
  // let fire = option.leading;
  let timer = null;
  let stashed = null;
  const startCooling = () => {
    timer = setTimeout(check, wait);
  };

  const check = () => {
    timer = null;
    if (stashed != null) {
      func(...stashed);
      stashed = null;
      startCooling();
    }
  };

  return function (...args) {
    if (timer !== null) {
      // fire = false;
      if (option.trailing) {
        stashed = [...args];
      }
      return;
    }

    if (option.leading) {
      func(...args);
      startCooling();
      return;
    }

    if (option.trailing) {
      stashed = [...args];
      startCooling();
    }
  };
}
