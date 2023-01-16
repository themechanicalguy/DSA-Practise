// given a number print all its digits in words
// 412 i.e four one two

function sayDigits(N) {
  //0
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
  if (N === 0) return; //FFT
  let digit = N % 10; //4

  sayDigits(Number.parseInt(N / 10)); //0
  console.log(arr[digit]);
}

sayDigits(412);
