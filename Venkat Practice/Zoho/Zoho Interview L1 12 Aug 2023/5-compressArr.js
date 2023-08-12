const { getInput } = require('./getInput');

const mergeArr = (arr) => {
  let N = arr.length;
  let mid = Math.floor(N / 2);
  let arr1 = arr.splice(0, mid);
  for (
    let i = arr.length - 1, j = arr1.length - 1;
    i >= 0 && j >= 0;
    i--, j--
  ) {
    arr[i] = arr[i] + arr1[j];
  }
};

const compress = (arr, K) => {
  const newArr = [...arr];

  for (let i = 0; i < K; i++) {
    if (newArr.length === 1) return newArr;
    mergeArr(newArr);
  }

  return newArr;
};

const main = async () => {
  const arrStr = await getInput('Enter values in comma seperated format: ');
  const K = Number(await getInput('Enter Steps to repeat (K) '));
  const arr = arrStr.split(',').map((val) => Number(val));

  compress(arr);

  const ans = compress(arr, K);

  console.log('ans', ans);
};

main();
