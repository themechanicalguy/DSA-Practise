const readline = require('readline');

const getInput = async (question) => {
  const quest = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    quest.question(question, (ans) => {
      quest.close();
      resolve(ans);
    });
  });
};

const getMatrixInput = async (M, N = M) => {
  const arr = new Array(M).fill(0).map(() => new Array(N));
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      arr[i][j] = await getInput(`Array[${i}][${j}]:`);
    }
  }
  return arr;
};

const getMatrixInputNumber = async (M, N = M) => {
  const arr = new Array(M).fill(0).map(() => new Array(N));
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      arr[i][j] = Number(await getInput(`Array[${i}][${j}]:`));
    }
  }
  return arr;
};

module.exports = { getInput, getMatrixInput, getMatrixInputNumber };
