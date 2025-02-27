//Two-Pointer Approach (Efficient and Clean)
function validMountainArray(arr) {
  const n = arr.length;
  if (n < 3) return false;

  let i = 0,
    j = n - 1;

  // Climb from the left
  while (i + 1 < n && arr[i] < arr[i + 1]) i++;

  // Climb from the right
  while (j - 1 >= 0 && arr[j] < arr[j - 1]) j--;

  // Valid mountain if pointers meet at the same peak (not at edges)
  return i > 0 && j < n - 1 && i === j;
}

//Approach 2- Single Pass with State Tracking
var validMountainArray = function (arr) {
  const n = arr.length;
  if (n < 3) return false;

  let i = 0;

  // Ascend
  while (i + 1 < n && arr[i] < arr[i + 1]) i++;

  // Peak can't be first or last
  if (i === 0 || i === n - 1) return false;

  // Descend
  while (i + 1 < n && arr[i] > arr[i + 1]) i++;

  return i === n - 1;
};
