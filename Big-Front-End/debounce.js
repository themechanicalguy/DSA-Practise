const debounce = (func, wait) => {
  let timer = null;

  debFunc = (args) => {
    timer = setTimeout(() => func(...args), wait);
  };

  return function (...args) {
    if (timer) clearTimeout(timer);
    debFunc(args);
  };
};
