// const { getInput } = require('./getInput');

let direction = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, -1],
  [-1, 1],
];
const spread = (arr, x, y, N) => {
  const move = (arr, x, y, N) => {
    if (x < 0 || y < 0 || x >= N || y >= N) return;
    if (arr[x][y] == 0) return;
    arr[x][y] = 0;

    for (let [X, Y] of direction) {
      move(arr, X + x, Y + y, N);
    }
  };
  move(arr, x, y, N);
  // const _spread = (x, y) => {
  //   if (arr[x][y] !== curCol) {
  //     return;
  //   }
  //   arr[x][y] = color;
  //   if (x > 0) {
  //     //left
  //     _spread(x - 1, y);
  //   }
  //   if (x < N - 1) {
  //     //right
  //     _spread(x + 1, y);
  //   }
  //   if (y > 0) {
  //     //up
  //     _spread(x, y - 1);
  //   }
  //   if (y < N - 1) {
  //     //up
  //     _spread(x, y + 1);
  //   }
  // };
  // _spread(x, y);
};
const findIslands = (arr, N) => {
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (arr[i][j] === 1) {
        count++;
        spread(arr, i, j, N);
      }
    }
  }
  return count;
};

const main = async () => {
  // const arr = [
  //   [1, 0, 0],
  //   [0, 1, 0],
  //   [0, 0, 1],
  // ];
  // const arr = [
  //   [1, 1, 1],
  //   [1, 0, 0],
  //   [1, 0, 1],
  // ];
  const arr = [
    [1, 1, 1],
    [0, 0, 0],
    [1, 0, 1],
  ];
  const N = 3;
  // getInput();
  const a = findIslands(arr, N);
  console.log(a, 'a is this');
};

main();
