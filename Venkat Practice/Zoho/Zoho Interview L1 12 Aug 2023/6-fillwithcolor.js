const { getInput, getMatrixInput } = require('./getInput');

const spread = (arr, color, x, y, N) => {
  const curCol = arr[x][y];
  const _spread = (x, y) => {
    if (arr[x][y] !== curCol) {
      return;
    }
    arr[x][y] = color;
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
  };
  _spread(x, y);
};

const fillWithColor = (N, arr, color, x, y) => {
  spread(arr, color, x, y, N);
};

const main = async () => {
  // const N = 7;
  // const arr = [
  //   ['R', 'G', 'G', 'G', 'G', 'G', 'R'],
  //   ['Y', 'R', 'R', 'R', 'R', 'R', 'Y'],
  //   ['Y', 'Y', 'R', 'R', 'R', 'Y', 'Y'],
  //   ['B', 'B', 'B', 'R', 'B', 'B', 'B'],
  //   ['Y', 'Y', 'R', 'R', 'R', 'Y', 'Y'],
  //   ['Y', 'R', 'R', 'R', 'R', 'R', 'Y'],
  //   ['R', 'G', 'G', 'G', 'G', 'G', 'R'],
  // ];
  // const col = 'Bl';
  // const [X, Y] = [1, 0];

  const N = Number(await getInput('Enter N: '));
  const arr = await getMatrixInput(N);
  const col = await getInput('Enter Color to fill: ');
  const cell = await getInput('Enter Cell (X,Y) comma Seperated: ');
  const [X, Y] = cell.split(',').map((val) => Number(val));
  fillWithColor(N, arr, col, X, Y);
  console.log(arr);
};

main();
