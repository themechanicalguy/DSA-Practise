const { getInput } = require('./getInput');

const rightMostDiff = (M, N) => {
  if (M == N) return 0;

  let compare = 1;
  for (let i = 0; i < 31; i++) {
    if ((M ^ N) & compare) {
      return i + 1;
    }
    compare = compare << 1;
  }
  return 0;
};

const main = async () => {
  // 5 : 101, 4: 100 ans:1
  // 5 : 101, 1: 001 ans:3
  const M = Number(await getInput('Value 1: '));
  const N = Number(await getInput('Value 2: '));
  const ans = rightMostDiff(M, N);
  console.log('right Most different: ', ans);
};

main();
