/**
 * @param {any[]} items
 * @param {number[]} newOrder
 * @return {void}
 */
function sort(items, newOrder) {
  // reorder items inline
  const result = new Array(6);

  for (let i = 0; i < items.length; i++) {
    result[newOrder[i]] = items[i];
  }
  for (let i = 0; i < items.length; i++) {
    items[i] = result[i];
  }
  console.log(result);
  return result;
}

const A = ['A', 'B', 'C', 'D', 'E', 'F'];
const B = [1, 5, 4, 3, 2, 0];
sort(A, B);
