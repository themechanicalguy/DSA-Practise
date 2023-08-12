const { getInput, getMatrixInputNumber } = require('./getInput');

const meetingInterval = (arr, intervalCount = 100) => {
  const N = arr.length;
  const time = new Array(intervalCount).fill(0);
  for (let i = 0; i < N; i++) {
    for (let j = arr[i][0]; j < arr[i][1]; j++) {
      if (time[j] === 1) {
        return false;
      }
      time[j] = 1;
    }
  }
  return true;
};

const main = async () => {
  const N = Number(await getInput('Enter no of inputs: '));
  const arr = await getMatrixInputNumber(N, 2);

  const ans = meetingInterval(arr);
  console.log('ans', ans);
};

main();
