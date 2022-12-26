// This is a JavaScript coding problem from BFE.dev

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */

// BELOW ARE MY CODE
function debounce(func, wait, option = { leading: false, trailing: true }) {
  // your code here

  let timer = null;

  const cleanTimer = () => timer !== null && clearTimeout(timer);

  return function (...args) {
    if (timer === null) {
      if (option.leading) {
        func(...args);
        timer = setTimeout(() => (timer = null), wait);
        return;
      }
    }

    if (option.trailing) {
      // timer !== null && clearTimeout(timer);
      cleanTimer();
      timer = setTimeout(() => {
        func(...args);
        timer = null;
      }, wait);
    } else {
      // timer !== null && clearTimeout(timer);
      cleanTimer();
      timer = setTimeout(() => (timer = null), wait);
    }
  };
}

// PROFESSIONAL CODER ANSWER
function debouncePRO(func, wait, option = { leading: false, trailing: true }) {
  // your code here

  let timer = null;

  return function (...args) {
    let isInvoked = false;
    // trigger the function(leading) when the func is triggered.
    if (timer === null && option.leading) {
      func(...args);
      isInvoked = true;
    }

    // always clear timer and trigger again this is how normal deboucing works
    timer !== null && clearTimeout(timer);
    timer = setTimeout(() => {
      if (option.trailing && !isInvoked) {
        func(...args);
      }
      timer = null;
    }, wait);
  };
}
