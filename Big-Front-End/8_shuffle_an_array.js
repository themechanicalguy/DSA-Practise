// This is a JavaScript coding problem from BFE.dev

/**
 your shuffle() should transform the array in one of the above array, at the same 1/24 probability.

notes

Your shuffle() will be called multiple times, to calculate the probability on each possible result, and test again standard deviation
Standard Deviation: https://simple.wikipedia.org/wiki/Standard_deviation
ref: https://javascript.info/task/shuffle
This shuffling method is called fished yates shuffling algorithm
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */

/**
 * @param {any[]} arr
 * @returns {void}
 */
function shuffle(arr) {
  // modify the arr inline to change the order randomly
  for (let i = arr.length; i > 0; i--) {
    const newIndex = Math.floor(Math.random() * i);
    let temp = arr[newIndex];
    arr[newIndex] = arr[i];
    arr[i] = temp;
  }
  return;
}
