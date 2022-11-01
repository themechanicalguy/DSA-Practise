// given a number print all its digits in words
// 412 i.e four one two

function sayDigits(N) {
  let arr = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];
  if (N === 0) return;
  let digit = N % 10;

  // N = N / 10;
  // Number.parseInt(N)
  sayDigits(Number.parseInt(N / 10));
  console.log(arr[digit]);
  // return;
}

console.log(sayDigits(412));
