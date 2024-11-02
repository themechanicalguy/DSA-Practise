//Sliding window approach using queue

function printFirstNegInt(arr, k) {
  let res = [];
  let queue = [];
  //Process the first window of size k  for (let i = 0; i < k; i++) {
  if (arr[i] < 0) queue.push(i);
  //process the rest of the array from k onwards
  for (let i = k; i < arr.length; i++) {
    //if there is a negative number in the queue, add it to the result, otherwise add 0

    res.push(queue.length > 0 ? arr[queue[0]] : 0);
    //remove the element that are out of current window

    if (queue.length > 0 && queue[0] <= i - k) queue.shift();
    //if it is a negative element add it to queue
    if (arr[i] < 0) queue.push(i);
  }

  res.push(queue.length > 0 ? arr[queue[0]] : 0);

  return res;
}

printFirstNegInt([12, -1, -7, 8, -15, 30, 16, 28], 3);
