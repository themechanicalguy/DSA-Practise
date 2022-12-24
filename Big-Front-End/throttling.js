const throttle = (func, delay) => {
  // Previously called time of the function
  let timer = null;
  let stashed = null;

  const startCooling = () => {
    timer = setTimeout(check, delay);
  };

  const check = () => {
    timer = null;
    if (stashed != null) {
      func.apply(stashed[0], stashed[1]);
      stashed = null;
      startCooling();
    }
  };

  return function (...args) {
    if (timer !== null) {
      stashed = [this, args];
    } else {
      func.apply(this, args);
      startCooling();
    }
  };
};

{
  let currentTime = 0;

  const run = (input) => {
    currentTime = 0;
    const calls = [];

    const func = (arg) => {
      console.log(arg, currentTime);
      calls.push(`${arg}@${currentTime}`);
    };

    const throttled = throttle(func, 3);
    input.forEach((call) => {
      const [arg, time] = call.split('@');
      setTimeout(() => throttled(arg), time);
    });
    return calls;
  };

  console.log(run(['A@0', 'B@2', 'C@3']), ' Venakt');
}
