// Given an array, find the no. of pairs which have a sum of K
// I = [1,4,4,5,5,5,6,6,11], K=11
// O = 6

// create a hashMap that stores 
// key = k - arr[i]

// (5,6),(5,6)()


const pairSum = (arr, sum) => {
  console.log(arr.sort((a, b) => a - b));
  let left = 0;
  let right = arr.length - 1;
  let pair = 0;

  while (left < right) {
    if (arr[left] + arr[right] === sum) {
      let l = 1,
        r = 1;
      left++;
      right--;
      if (arr[left] !== arr[right]) {
        while (arr[left] === arr[left + 1]) {
          left++;
          l++;
        }
        while (arr[right] === arr[right - 1]) {
          right--;
          r++;
        }
        pair += 
      } else {
        pair += (r-l) + 1;
      }
      // right--;
      pair = l * r + pair;
    } else if (arr[left] + arr[right] < sum) {
      left++;
    } else {
      right--;
    }
  }
  return pair;
};

function fact(num){
  if(num === 1) return 1;
  return num * fact(num-1);
}

console.log(
  pairSum([10, 12, 10, 15, -1, 7, 6, 5, 5, 5, 5, 5, 4, 2, 1, 1, 1], 10)
);