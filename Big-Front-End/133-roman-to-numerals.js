// Symbol	I	V	X	L	C	D	M
// Value	1	5	10	50	100	500	1000

const romanToInteger = (str) => {
  const valueRoman = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  const arr = str.split('');
  let currentMax = 0;
  let num = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    const value = valueRoman[arr[i]];
    if (currentMax > value) {
      num -= value;
    } else {
      num += value;
      currentMax = value;
    }
  }
  return num;
};

function romanToIntegerV2(str) {
  const numerals = new Map([
    ['I', 1],
    ['V', 5],
    ['X', 10],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000],
  ]);

  const backwards = str.split('').reverse();

  let prev = 0;
  return backwards.reduce((sum, char) => {
    const value = numerals.get(char);
    sum = sum + (value >= prev ? value : -value);
    prev = value;

    return sum;
  }, 0);
}

function main() {
  romanToInteger('CXXIII');
  // 123

  romanToInteger('MCMXCIX');
  // 1999

  romanToInteger('MMMCDXX');
}

main();
