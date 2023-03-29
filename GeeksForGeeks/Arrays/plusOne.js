// Plus One
// https://practice.geeksforgeeks.org/problems/plus-one/1?page=1&status[]=solved&category[]=Arrays&sortBy=submissions

function increment(arr, n) {
  //n is the length of the array

  //1. Initialized individualSum, i
  let individualSum = 1;
  //2. set i to end of the array so we can go backwards
  let i = arr.length - 1;

  // 3. loop till individualSum !=0 and i>=0
  while (individualSum != 0 && i >= 0) {
    // 1. add individualsum and arr[i]
    individualSum += arr[i];
    // 2. insert the arr[i] with the last digit
    arr[i--] = Math.floor(individualSum % 10);
    // 3. now divide 10 to individualSum so we get a single digit.
    individualSum = Math.floor(individualSum / 10);
  }
  // 4. if individualSum still has a value then put the shift the arr with individualSum
  if (individualSum) arr = [individualSum, ...arr];
  // 5. return the arr
  // 6. Stop
  return arr;
}
