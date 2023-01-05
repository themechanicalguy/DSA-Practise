// JavaScript program to rearrange an array in minimum
// maximum form

// Prints max at first position, min at second position
// second max at third position, second min at fourth
// position and so on.
function rearrange(arr, n) {
  // initialize index of first minimum and first
  // maximum element
  let max_idx = n - 1,
    min_idx = 0;

  // store maximum element of array
  let max_elem = arr[n - 1] + 1;

  // traverse array elements
  for (let i = 0; i < n; i++) {
    // at even index : we have to put maximum element
    if (i % 2 == 0) {
      arr[i] += (arr[max_idx] % max_elem) * max_elem;
      max_idx--;
    }

    // at odd index : we have to put minimum element
    else {
      arr[i] += (arr[min_idx] % max_elem) * max_elem;
      min_idx++;
    }
  }

  // array elements back to it's original form
  for (let i = 0; i < n; i++) arr[i] = Math.floor(arr[i] / max_elem);
}

// How does expression “arr[i] += arr[max_index] % max_element * max_element” work ?
// The purpose of this expression is to store two elements at index arr[i]. arr[max_index] is stored as multiplier and “arr[i]” is stored as remainder. For example in {1 2 3 4 5 6 7 8 9}, max_element is 10 and we store 91 at index 0. With 91, we can get original element as 91%10 and new element as 91/10.
// Below implementation of above idea:

const arr = [31, 33, 34, 35, 36];
rearrange(arr, arr.length);
console.log(arr, 'arr');
