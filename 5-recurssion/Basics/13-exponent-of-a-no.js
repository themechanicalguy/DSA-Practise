// Given a 2, base , exp numbers, return the result
// i.e 3,3 = 9
// 2,3 = 8

function power(a, b) {
  //base case
  if (b === 0) return 1;
  if (b === 1) return a;

  // recurssive call
  let ans = power(a, Number.parseInt(b / 2));

  if (b % 2 === 0) return ans * ans;
  else return a * ans * ans;
}

let res = power(2, 3);
console.log(res);
