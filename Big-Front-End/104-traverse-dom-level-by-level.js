/**
 * @param {HTMLElement | null} root
 * @return {HTMLElement[]}
 */
function flatten(root) {
  // your code here
  if (!root) return [];
  let queue = [root];
  let i = 0;
  while (i < queue.length) {
    if (queue[i].hasChildNodes()) {
      queue = [...queue, ...queue[i].children];
    }
    i++;
  }
  return queue;
}
