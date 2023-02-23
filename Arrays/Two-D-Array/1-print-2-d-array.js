function print() {
  let arr = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  let rows = arr.length;
  let cols = arr[0].length;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      console.log(arr[row][col]);
    }
  }
}
console.log(colSum());

function rowSum() {
  let arr = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  let rows = arr.length;
  let cols = arr[0].length;
  for (let row = 0; row < rows; row++) {
    let sum = 0;
    for (let col = 0; col < cols; col++) {
      sum += arr[row][col];
    }
    console.log(sum);
  }
}

//col sum
function colSum() {
  let arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  let rows = arr.length;
  let cols = arr[0].length;
  for (let row = 0; row < rows; row++) {
    let sum = 0;
    for (let col = 0; col < cols - 1; col++) {
      sum += arr[col][row];
    }
    console.log(sum);
  }
}

//Linear Search in a matrics
