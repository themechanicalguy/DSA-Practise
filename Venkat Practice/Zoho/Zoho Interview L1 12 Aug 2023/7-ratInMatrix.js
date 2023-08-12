const { getInput, getMatrixInputNumber } = require('./getInput');

const spread = (arr, x, y, N) => {
  // const curCol = arr[x][y];
  if (arr[0][0] == 0 || arr[N - 1][N - 1] == 0) return 0;
  let count = 0;
  const _spread = (x, y) => {
    if (x == N - 1 && y == N - 1) {
      count++;
      return;
    }
    if (arr[x][y] == 0) {
      return;
    }
    arr[x][y] = 0;
    if (x > 0) {
      //left
      _spread(x - 1, y);
    }
    if (x < N - 1) {
      //right
      _spread(x + 1, y);
    }
    if (y > 0) {
      //up
      _spread(x, y - 1);
    }
    if (y < N - 1) {
      //up
      _spread(x, y + 1);
    }
    arr[x][y] = 1;
  };
  _spread(x, y);

  return count;
};

const main = async () => {
  const N = Number(await getInput('Enter N: '));
  const mat = await getMatrixInputNumber(N);
  // const mat = [
  //   [1, 0, 0, 0],
  //   [1, 1, 1, 1],
  //   [1, 1, 1, 0],
  //   [0, 0, 1, 1],
  // ];
  const ans = spread(mat, 0, 0, N);
  console.log('ans', ans);
};

main();
