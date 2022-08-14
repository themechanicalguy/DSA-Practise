// Write a function called same, that accepts 2 arrays.
// Return true if every value in arr1 is squared in arr2.
// Frequency of values must be same

// Naive approach 1
function same(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    let key = arr1[i] ** 2;
    let flag = 0;
    for (let j = 0; j < arr2.length; j++) {
      // find if key is there in arr2
      if (arr2[j] === key) flag = 1;
    }
    if (flag === 0) {
      return -1;
    }
  }
  return true;
}

// Naive Approach 2
function same2(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    const correctIndex = arr1.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) {
      return false;
    }
    arr2.splice(correctIndex, 1);
  }
  return true;
}

// Refactor Approach 1
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const freqCounter1 = {};
  const freqCounter2 = {};
  for (let i = 0; i < arr1.length; i++) {
    const code = arr1[i];
    freqCounter1[code] = (freqCounter1[code] || 0) + 1;
  }
  console.log(freqCounter1);
  for (let i = 0; i < arr2.length; i++) {
    const code = arr2[i];
    freqCounter2[code] = (freqCounter2[code] || 0) + 1;
  }
  console.log(freqCounter2);

  for (let item of freqCounter1) {
    if (![item ** 2] in freqCounter2) return false;
    if (freqCounter1[key] !== freqCounter2[key ** 2]) return false;
  }
  return true;
}
