//given 2 arrays, find the intersection of the arrays
function intersection(arr1, arr2) {
  let res = [];
  for (let i = 0; i < arr1.length; i++) {
    let key = arr1[i];
    for (let j = 0; j < arr2.length; j++) {
      if (key === arr2[j]) {
        res.push(key);
        arr2[j] = -1;
      }
    }
  }
  return res;
}

console.log(intersection([2, 4, 6, 4, 8], [1, 4, 7, 6]));
