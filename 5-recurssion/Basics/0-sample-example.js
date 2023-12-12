// 1- Print number from N to 1.
function counter(N) {
  if (N < 1) return;
  console.log(N);
  counter(N - 1);
}

// counter(5);

//2- Print sum of number from a given range
function sumRange(num) {
  if (num == 1) return 1;
  return num + sumRange(num - 1);
}
// sumRange(3);

//3 -  Print factorial for a given number
function fact(N) {
  if (N === 1) return 1;
  return N * fact(N - 1);
}
// fact(6);

// 4 - return the odd number array from a given array, using helper function recurssion
function recrFunction(array,resultArr) {
    if (array.length === 0) {
      return resultArr;
    }
    if (array[0] % 2 !== 0) {
      resultArr?.push(array[0]);
    }
    recrFunction(array.slice(1),resultArr);
}
function helperFunction(arr) {
  const resultArr = [];
  recrFunction(arr,resultArr);
  return resultArr;
}
helperFunction([1, 2, 3, 4, 5]);

// 5 - with pure recurssionfunction pureRecurssion(arr) { - pure recurssion is least applicable. it can be applied to only simple tasks
  let resArr = [];
  if (arr.length === 0) return resArr;

  if (arr[0] % 2 !== 0) resArr.push(arr[0]);
  // arr.slice(arr.concat(pureRecurssion(arr)))
  resArr = resArr.concat(pureRecurssion(arr.slice(1)));
  return resArr;
}
pureRecurssion([1, 2, 3, 4, 5]);
