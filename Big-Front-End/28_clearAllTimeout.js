/**
 * cancel all timer from window.setTimeout
 */

const window = Object; // adding this just to not get error in the local
const oriTimeout = window.setTimeout;
const allTimeout = [];
window.setTimeout = (cb, time) => {
  const timer = oriTimeout(cb, time);
  allTimeout.push(timer);
  return timer;
};
function clearAllTimeout() {
  // your code here
  allTimeout.forEach((timer) => {
    window.clearTimeout(timer);
  });
}
const cb = () => console.log('I am Zesova lazy knight');
window.setTimeout(cb, 1000);
window.setTimeout(cb, 3000);
window.setTimeout(cb, 2000);

clearAllTimeout();
