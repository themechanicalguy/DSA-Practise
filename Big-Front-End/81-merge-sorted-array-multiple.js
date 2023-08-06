// Author: Venkataramanan Balasingam
const doIteration = (lenArr, iter) => {
  // console.log(lenArr, iter);
  for (let i = 0; i < lenArr.length; i++) {
    if (lenArr[i] > iter[i]) return true;
  }
  return false;
};

/**
 * @param {number[][]} arrList
 * non-descending integer array
 * @return {number[]}
 */
function merge(arrList) {
  // your code here
  if (!arrList.length) return [];
  const n = arrList.length;
  const arr = new Array(n).fill(0);
  const iter = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    arr[i] = arrList[i].length;
  }
  const mergedArray = [];
  let curIndex; // represents the array that has smaller size  iter index
  let curSmall = arrList[0][0];
  // console.log('venkat', doIteration(arr, iter));
  while (doIteration(arr, iter)) {
    curIndex = 0;
    curSmall = arrList[curIndex][iter[curIndex]];

    for (let i = 1; i < iter.length; i++) {
      if (typeof curSmall === 'undefined' || curSmall > arrList[i][iter[i]]) {
        curIndex = i;
        curSmall = arrList[i][iter[i]];
      }
    }
    iter[curIndex]++;
    mergedArray.push(curSmall);
  }
  console.log(mergedArray, 'arr');
  return mergedArray;
}

// Below function is an interesting solution found on internet
/**
 * @param {number[][]} arrList
 * non-descending integer array
 * @return {number[]}
 */
function merge2Lists(arr1, arr2) {
  let [i, j] = [0, 0];
  let res = [];
  while (i < arr1.length || j < arr2.length) {
    if (i >= arr1.length || arr1[i] > arr2[j]) {
      res.push(arr2[j]);
      j++;
    } else {
      res.push(arr1[i]);
      i++;
    }
  }
  return res;
}

function mergeV2(arrList) {
  if (arrList.length === 0) return [];
  if (arrList.length === 1) return arrList[0];
  if (arrList.length === 2) return merge2Lists(arrList[0], arrList[1]);
  let mid = Math.floor(arrList.length / 2);
  let left = merge(arrList.slice(0, mid));
  let right = merge(arrList.slice(mid, arrList.length));
  return merge2Lists(left, right);
}

// merge([[3],[2],[1]]);
// merge([
//   [1, 1, 1, 100, 1000, 10000],
//   [1, 2, 2, 2, 200, 200, 1000],
//   [1000000, 10000001],
//   [2, 3, 3],
// ]);

merge([]);
